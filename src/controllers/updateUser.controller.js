import "cookie-session";
import { addLessonToNetid, removeLessonFromNetid } from "../services/updateUser.service.js";

export function addLesson(req, res, next) {
  const netid = req.session.cas?.netid || req.session.google.email.split("@")[0];
    addLessonToNetid(req.body.lesson, netid)
      .then((numRowsUpdated) =>
        numRowsUpdated
          ? res
              .status(200)
              .send(
                `Successfully added ${req.body.lesson} to User with netid ${netid}`
              )
          : res.status(404).send("Lesson was not added.")
      )
      .catch((err) => {
        console.error("Error while adding lesson: " + err);
        res.status(404).send("Error while adding lesson: " + err);
      });
  }
  
export function deleteLesson(req, res, next) {
    const netid = req.session.cas?.netid || req.session.google.email.split("@")[0];
    removeLessonFromNetid(req.body.lesson, netid)
      .then((numRowsUpdated) =>
        numRowsUpdated ?
        res
          .status(200)
          .send(
            `Successfully removed ${req.body.lesson} from User with netid ${netid}`
          ) : res.status(404).send("Lesson was not removed.")
      )
      .catch((err) => {
        console.error("Error while removing lesson: " + err);
        res.status(404).send("Error while adding lesson: " + err);
      });
  }