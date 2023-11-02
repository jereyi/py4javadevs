// Based on https://github.com/Ngalstyan4/princeton-cas/

const passport = require('passport');
const CustomStrategy = require('passport-custom');
const https = require('https');

passport.use("cas",new CustomStrategy(
  function(req, done) {
		if(!process.env.CAS_ENABLED)
			return done(null, { id: process.env.CAS_DEMOUSER});
  	if (!req.query.ticket)
			return done(null,false, {message:"Invalid pass."});
			
  	https
      .get(
        process.env.CAS_VALIDATE +
          `?ticket=${req.query.ticket}&service=${process.env.CAS_URL}`,
        (res, d) => {
          let body = "";
          res.setEncoding("utf8");
          res.on("data", (d) => {
            body += d;
          });
          res.on("end", () => {
            let answer = body.split("\n");
            if (answer[0] == "no")
              return done(null, false, { message: "Invalid ticket." });
            return done(null, { id: answer[1] });
          });
        }
      )
      .on("error", console.log);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    cb(null, {user:"deserialize",id:"sample"});
});

module.exports = {
  passport,
  authenticate: passport.authenticate("cas", {
    failureRedirect: process.env.CAS_LOGIN + "?service=" + process.env.CAS_URL,
  }),
  logout: function (req, res) {
    req.logout();
    res.redirect(process.env.CAS_LOGOUT + "?service=" + process.env.CAS_URL);
  },
};