import "cookie-session";
import CAS from "cas";
import { getUserByNetid } from "../services/auth.service.js";

var cas = new CAS({
  base_url: process.env.CAS_ENDPOINT,
  service: process.env.SERVER_URL + "/auth/verify",
});

export async function verify(req, res) {
  try {
    // Check if the user has a redirection destination
    let redirectDestination =
      process.env.CLIENT_URL + "/home";

    // If the user already has a valid CAS session then send them to their destination
    if (req.session.cas) {
      console.log("Existing valid cas session: " + JSON.stringify(req.session.cas))
      res.redirect(redirectDestination);
      return;
    }

    var ticket = req.query.ticket;
    console.log(ticket);
    // If the user does not have a ticket then send them to the homepage
    if (typeof ticket === "undefined") {
      console.log("No ticket");
      res.redirect(process.env.CLIENT_URL + "/home");
      return;
    }

    // Check if the user's ticket is valid
    await cas.validate(ticket, function (err, status, netid) {
      if (err) {
        console.log("Error in cas validation: " + JSON.stringify(err));
        res.send({ error: err }).status(500);
        return;
      }
      // Save the user's session data
      req.session.cas = {
        status: status,
        ticket: ticket,
        netid: netid,
      };
      console.log("Beginning cas session: " + JSON.stringify(req.session.cas))
      res.redirect(redirectDestination);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error in verifying ticket!");
  }
}

export async function getUser(req, res) {
  console.log("CAS " + req.session.cas);
  if (req.session.cas) {
    console.log("CAS Session exists");
    const user = await getUserByNetid(req.session.cas.netid);
    console.log("user " + user);
    if (user) {
      res.json(JSON.stringify(user));
      return;
    }
  } 
  res.status(404).send("User not found");
}

export async function logout(req, res) {
  req.session = null;
  res.redirect(
    process.env.CAS_ENDPOINT + "/logout?url=" + process.env.SERVER_URL
  );
}
