import { getLessonByTitle}  from '../services/curriculum.service.js';

async function get(req, res, next) {
  try {
      res.json(await getLessonByTitle(req.query.title));
  } catch (err) {
      console.error(`Error while getting lesson`, err.message);
      next(err);
  }
}

export default get;