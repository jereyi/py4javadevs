import { getLessonByTitle}  from '../services/curriculum.service.js';

async function get(req, res, next) {
  try {
      res.json(await getLessonByTitle(req.query.title));
  } catch (err) {
      console.error(`Error while getting lesson`, err.message);
      res.status(404).send(`Error while getting lesson`);
  }
}

export default get;