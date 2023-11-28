import "openai/shims/node";
import request from "supertest";
import app from "../index.js";
import { describe, expect, it } from "vitest";

describe("get-exercise route", function () {
  describe("GET /", function () {
    it("Should return the specified exercise", async function () {
      const urlParams = {
        title: "testing",
      };
      const response = await getExercise(urlParams);

      const expectedExercise = [
        {
          question: "Test Question\n",
          java:
            "public class Solution {\n" +
            "\n" +
            "  public static void main(String[] args) {\n" +
            '    String test = "This is a test.";\n' +
            "  }\n" +
            "}\n",
          python: 'test = "This is a test."\n',
        },
        {
          question: "Another Test Question\n",
          java:
            "public class Solution {\n" +
            "\n" +
            "  public static void main(String[] args) {\n" +
            '    String test = "This is another test.";\n' +
            "  }\n" +
            "}\n",
          python: 'test = "This is another test."\n',
        },
      ];

      // eslint-disable-next-line jest/valid-expect
      expect(response.body).toStrictEqual(expectedExercise);
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
