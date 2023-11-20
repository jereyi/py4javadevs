import 'openai/shims/node'
import request from "supertest";
import app from "../index.js";
import parser from "../utils/parser.util.js";
import { describe, expect, it } from 'vitest';

describe("get-exercise route", function () {
  describe("GET /", function () {
    it("Should return the specified exercise", async function () {
      const urlParams = {
        title: "variables",
      };
      const response = await getExercise(urlParams);

      const expectedLesson = await parser.csvToArray(
        "exercises/variables-exercises.csv"
      );

      // eslint-disable-next-line jest/valid-expect
      expect(response.body).toStrictEqual(expectedLesson);
    });

    it("Should fail if exercise does not exists", async function () {
      const urlParams = {
        title: "invalid-lesson",
      };
      const response = await getExercise(urlParams, 404);

      // eslint-disable-next-line jest/valid-expect
      expect(response.text).equals("Error while getting exercise");
    });
  });

  async function getExercise(urlParams, status = 200) {
    const response = await request(app)
      .get("/get-exercise")
      .query(urlParams)
      .expect(status);
    return response;
  }
});
