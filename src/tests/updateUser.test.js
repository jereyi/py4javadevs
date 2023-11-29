import "openai/shims/node";
import request from "supertest";
import app from "../index.js";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
  beforeAll,
  afterAll,
} from "vitest";
import mockSession from "mock-session";
import { pool } from "../db.cjs";

describe("update-user route", function () {
  describe("PUT /lesson", function () {
    let user1 = {
      net_id: "jereyi",
      display_name: "Jessica-Ann Ereyi",
      last_login: "2016-01-25T15:10:10.555Z",
      completed_lessons: [],
    };

    let user2 = {
      net_id: "jereyi",
      display_name: "Jessica-Ann Ereyi",
      last_login: "2016-01-25T15:10:10.555Z",
      completed_lessons: ["testing"],
    };

    beforeAll(async () => {
      await pool.query(
        // eslint-disable-next-line no-multi-str
        "CREATE TEMPORARY TABLE users \
          (net_id TEXT NOT NULL, \
            display_name TEXT NOT NULL, \
            last_login TIMESTAMPTZ DEFAULT now(), \
            completed_lessons TEXT[] NOT NULL DEFAULT ARRAY[]:: text[])"
      );
      await pool.query(
        "INSERT INTO users (net_id, display_name, last_login, completed_lessons) VALUES ($1, $2, $3, $4)",
        [
          user1.net_id,
          user1.display_name,
          user1.last_login,
          user1.completed_lessons,
        ]
      );
    });

    afterAll(async () => {
      await pool.query("DROP TABLE users");
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("Should add lesson if not already present", async function () {
      const req = {
        lesson: "testing",
      };
      let res = await pool.query("SELECT * FROM users WHERE net_id = ($1)", [
        user1.net_id,
      ]);
      expect(JSON.stringify(res.rows.at(0))).equal(JSON.stringify(user1));

      await putLesson(req, 200, {
        cas: { status: "active", ticket: "abc12345", netid: "jereyi" },
      });

      res = await pool.query("SELECT * FROM users WHERE net_id = ($1)", [
        user1.net_id,
      ]);

      expect(res.rowCount).equal(1);
      expect(JSON.stringify(res.rows.at(0))).equal(JSON.stringify(user2));
    });

    it("Should return 200 if lesson already present", async function () {
      const req = {
        lesson: "testing",
      };
      let res = await pool.query("SELECT * FROM users WHERE net_id = ($1)", [
        user1.net_id,
      ]);

      res = await putLesson(req, 200, {
        cas: { status: "active", ticket: "abc12345", netid: "jereyi" },
      });

      expect(res.text).equals(
        "Successfully added testing to User with netid jereyi"
      );

      res = await pool.query("SELECT * FROM users WHERE net_id = ($1)", [
        user1.net_id,
      ]);

      expect(res.rowCount).equal(1);
      expect(JSON.stringify(res.rows.at(0))).equal(JSON.stringify(user2));
    });

    it("Should return 404 if user cannot be found", async function () {
      const req = {
        lesson: "testing",
      };
      const response = await putLesson(req, 404, {
        cas: { status: "active", ticket: "abc12345", netid: "error" },
      });

      expect(response.text).equals("Lesson was not added.");
    });
  });

  describe("DELETE /lesson", function () {
    let user1 = {
      net_id: "jereyi",
      display_name: "Jessica-Ann Ereyi",
      last_login: "2016-01-25T15:10:10.555Z",
      completed_lessons: ["testing"],
    };

    let user2 = {
      net_id: "jereyi",
      display_name: "Jessica-Ann Ereyi",
      last_login: "2016-01-25T15:10:10.555Z",
      completed_lessons: [],
    };

    beforeAll(async () => {
      await pool.query(
        // eslint-disable-next-line no-multi-str
        "CREATE TEMPORARY TABLE users \
          (net_id TEXT NOT NULL, \
            display_name TEXT NOT NULL, \
            last_login TIMESTAMPTZ DEFAULT now(), \
            completed_lessons TEXT[] NOT NULL DEFAULT ARRAY[]:: text[])"
      );
      await pool.query(
        "INSERT INTO users (net_id, display_name, last_login, completed_lessons) VALUES ($1, $2, $3, $4)",
        [
          user1.net_id,
          user1.display_name,
          user1.last_login,
          user1.completed_lessons,
        ]
      );
    });

    afterAll(async () => {
      await pool.query("DROP TABLE users");
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("Should delete lesson if present", async function () {
      const req = {
        lesson: "testing",
      };
      let res = await pool.query("SELECT * FROM users WHERE net_id = ($1)", [
        user1.net_id,
      ]);
      expect(JSON.stringify(res.rows.at(0))).equal(JSON.stringify(user1));

      await deleteLesson(req, 200, {
        cas: { status: "active", ticket: "abc12345", netid: "jereyi" },
      });

      res = await pool.query("SELECT * FROM users WHERE net_id = ($1)", [
        user1.net_id,
      ]);

      expect(res.rowCount).equal(1);
      expect(JSON.stringify(res.rows.at(0))).equal(JSON.stringify(user2));
    });

    it("Should return 404 if lesson not already present", async function () {
      const req = {
        lesson: "invalidLesson",
      };
      let res = await pool.query("SELECT * FROM users WHERE net_id = ($1)", [
        user1.net_id,
      ]);

      expect(JSON.stringify(res.rows.at(0))).equal(JSON.stringify(user2));

      await deleteLesson(req, 200, {
        cas: { status: "active", ticket: "abc12345", netid: "jereyi" },
      });

      res = await pool.query("SELECT * FROM users WHERE net_id = ($1)", [
        user1.net_id,
      ]);

      expect(res.rowCount).equal(1);
      expect(JSON.stringify(res.rows.at(0))).equal(JSON.stringify(user2));
    });

    it("Should return 404 if user cannot be found", async function () {
      const req = {
        lesson: "testing",
      };
      await deleteLesson(req, 404, {
        cas: { status: "active", ticket: "abc12345", netid: "error" },
      });
    });
  });

  // TODO: Update to use environment variable
  async function putLesson(req, status = 200, cookies = {}) {
    let cookie = mockSession("session", "Shsh!Secret!", cookies);
    const response = await request(app)
      .put(`/update-user/lesson`)
      .send(req)
      .set("Content-Type", "application/json")
      .set("cookie", [cookie])
      .expect(status);
    return response;
  }

  async function deleteLesson(req, status = 200, cookies = {}) {
    let cookie = mockSession("session", "Shsh!Secret!", cookies);
    const response = await request(app)
      .delete(`/update-user/lesson`)
      .send(req)
      .set("Content-Type", "application/json")
      .set("cookie", [cookie])
      .expect(status);
    return response;
  }
});
