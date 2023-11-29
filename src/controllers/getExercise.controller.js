import { getExerciseByTitle } from '../services/curriculum.service.js';

async function get(req, res, next) {
  try {
      res.json(await getExerciseByTitle(req.query.title));
  } catch (err) {
      console.error(`Error while getting exercise`, err.message);
      res.status(404).send(`Error while getting exercise`);
  }
}

export default get;