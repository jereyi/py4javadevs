import { APIcall } from '../services/chatGpt.service.js';

async function query(req, res, next) {
  try {
        res.json(await APIcall(req.body.code));
  } catch (err) {
      console.error(`Error while querying Chat GPT`, err.message);
      res.status(500).send(`Error while querying Chat GPT`);
  }
}

export default query;