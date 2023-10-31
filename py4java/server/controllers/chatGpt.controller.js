import APIcall from '../services/chatGpt.service.js';

async function query(req, res, next) {
  try {
        //res.json(req.body);
        //console.log("req "+JSON.stringify(req.body));
        res.json(await APIcall(req.body.code));
  } catch (err) {
      console.error(`Error while querying chat GPT`, err.message);
      next(err);
  }
}

export default query;