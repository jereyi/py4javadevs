
import 'openai/shims/node'
import request from "supertest";
import app from "../index.js";
import parser from "../utils/parser.util.js";
import { describe, expect, it } from 'vitest';

describe("get-lesson route", function () {
  describe("GET /", function () {
    it("Should return the specified lesson", async function () {
      const urlParams = {
        title: "testing",
      };
      const response = await getLesson(urlParams);

      const expectedLesson = [
        {
          java:
            "public class Main {\n" +
            "\n" +
            "  public static void main(String[] args) {\n" +
            '    String test = "This is a test.";\n' +
            "  }\n" +
            "}\n",
          javaNote: "This is a `test`.",
          python: 'test = "This is another test."\n',
          pythonNote: "`This` is a test.",
          topic: "Test 1",
        },
        {
          java:
            "public class Main {\n" +
            "\n" +
            "  public static void main(String[] args) {\n" +
            '    String test = "This is another test.";\n' +
            "  }\n" +
            "}\n",
          javaNote: "This is `another` test.",
          python: 'test = "This is another test."\n',
          pythonNote: "This is another test.",
          topic: "Test 2",
        },
      ];

      // eslint-disable-next-line jest/valid-expect
      expect(response.body).toStrictEqual(expectedLesson);
    });

    it("Should fail if lesson does not exists", async function () {
      const urlParams = {
        title: "invalid-lesson",
      };
      const response = await getLesson(urlParams, 404);

      // eslint-disable-next-line jest/valid-expect
      expect(response.text).equals("Error while getting lesson");
    });
  });

  async function getLesson(urlParams, status = 200) {
    const response = await request(app)
      .get("/get-lesson")
      .query(urlParams)
      .expect(status);
    return response;
  }
});
