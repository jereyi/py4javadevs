import "openai/shims/node";
import request from "supertest";
import app from "../index.js";
import {
  beforeEach,
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
import CAS from "cas";

vi.mock("cas", () => {
  const CAS = vi.fn();
  CAS.prototype.validate = vi.fn((ticket, onValidate) => {
    if (ticket === "error") {
      onValidate("Test Error", null, null);
    } else {
      onValidate(null, "active", "jDoe");
    }
  });

  return { default: CAS };
});

vi.mock("../utils/db.util.js", async () => {
  const actual = await vi.importActual("../utils/db.util.js")
  const getDisplayName = (netid) => {
    if (netid === "error") {
      throw new Error("Get User Error");
    }
    console.log("Display name is Jane Doe")
    return Promise.resolve("Jane Doe");
  }

  return { ...actual, getDisplayName };
});

describe("auth route", function () {
  describe("GET /verify", function () {
    let cas;

    beforeEach(() => {
      cas = new CAS();
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("Should redirect to home page if existing cas session", async function () {
      const urlParams = {
        ticket: "abc12345",
      };
      const response = await auth("verify", urlParams, 302, {
        cas: { status: "active", ticket: "abc12345", netid: "jDoe" },
      });

      expect(response.redirect).toBe(true);
      expect(response.text).equals(
        `Found. Redirecting to ${process.env.SERVER_URL + "/home"}`
      );
      expect(cas.validate).not.toBeCalled();
    });

    it("Should redirect to home page if no ticket cas session", async function () {
      const urlParams = {};
      const response = await auth("verify", urlParams, 302);

      expect(response.redirect).toBe(true);
      expect(response.text).equals(
        `Found. Redirecting to ${process.env.SERVER_URL + "/home"}`
      );
      expect(cas.validate).not.toBeCalled();
    });

    it("Should create new cas session and redirect to home page if ticket valid", async function () {
      const urlParams = {
        ticket: "abc12345",
      };
      const response = await auth("verify", urlParams, 302);

      expect(response.redirect).toBe(true);
      expect(response.text).equals(
        `Found. Redirecting to ${process.env.SERVER_URL + "/home"}`
      );
      expect(cas.validate).toBeCalledTimes(1);
      expect(cas.validate).toBeCalledWith("abc12345", expect.any(Function));
    });

    it("Should fail if cas validation returns an error", async function () {
      const urlParams = {
        ticket: "error",
      };
      const response = await auth("verify", urlParams, 500);

      expect(response.redirect).toBe(false);
      expect(response.error.text).equals("Server error in verifying ticket!");
      expect(response.error.status).equals(500);
      expect(cas.validate).toBeCalledTimes(1);
      expect(cas.validate).toBeCalledWith("error", expect.any(Function));
    });
  });

  describe("GET /getUser", function () {
    let user1 = {
      net_id: "jereyi",
      display_name: "Jessica-Ann Ereyi",
      last_login: "2016-01-25T15:10:10.555Z",
      completed_lessons: ["testing"],
    };

    let user2 = {
      net_id: "jDoe",
      display_name: "Jane Doe",
      last_login: "2023-11-29T02:49:27.728Z",
      completed_lessons: [],
    };

    beforeAll(async () => {
      let response = await pool.query(
        // eslint-disable-next-line no-multi-str
        "CREATE TEMPORARY TABLE users \
          (net_id TEXT NOT NULL, \
            display_name TEXT NOT NULL, \
            last_login TIMESTAMPTZ DEFAULT now(), \
            completed_lessons TEXT[] NOT NULL DEFAULT ARRAY[]:: text[])"
      );
      console.log(response);
      response = await pool.query(
        "INSERT INTO users (net_id, display_name, last_login, completed_lessons) VALUES ($1, $2, $3, $4)",
        [user1.net_id, user1.display_name, user1.last_login, user1.completed_lessons]
      );
      console.log(response);
    });

    afterAll(async () => {
      await pool.query("DROP TABLE users");
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("Should return existing user if valid cas session", async function () {
        const urlParams = {
          ticket: "abc12345",
        };
        const response = await auth("/getUser", urlParams, 200, {
          cas: { status: "active", ticket: "abc12345", netid: "jereyi" },
        });

        expect(response.body).toStrictEqual(
          JSON.stringify(user1)
        );
      });

    it("Should return new user if valid cas session", async function () {
      const urlParams = {
        ticket: "abc12345",
      };
      const response = await auth("/getUser", urlParams, 200, {
        cas: { status: "active", ticket: "abc12345", netid: "jDoe" },
      });

      expect(JSON.parse(response.body).net_id).equal(user2.net_id);
      expect(JSON.parse(response.body).display_name).equal(user2.display_name);
      expect(JSON.parse(response.body).completed_lessons).toStrictEqual(user2.completed_lessons);
    });

    it("Should return 404 if no valid cas session", async function () {
      const urlParams = {};
      const response = await auth("/getUser", urlParams, 404, {
        cas: { status: "active", ticket: "abc12345", netid: "error" },
      });

      expect(response.text).equals("User not found");
    });
  });

  // TODO: Update to use environment variable
  async function auth(path, urlParams, status = 200, cookies = {}) {
    let cookie = mockSession("session", "Shsh!Secret!", cookies);
    const response = await request(app)
      .get(`/auth/${path}`)
      .query(urlParams)
      .set("Content-Type", "application/json")
      .set("cookie", [cookie])
      .expect(status);
    return response;
  }
});
