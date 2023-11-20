import "openai/shims/node";
import request from "supertest";
import app from "../index.js";
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import mockSession from 'mock-session';
import CAS from "cas";

vi.mock('cas', () => {
    const CAS = vi.fn()
    CAS.prototype.validate = vi.fn((ticket, onValidate) => {
        if (ticket === "error") {
            onValidate("Test Error", null, null);
        } else {
            onValidate(null, "active", "jDoe");
        }
    })
  
    return {default : CAS};
});

describe("auth route", function () {
  describe("GET /verify", function () {
    let cas

    beforeEach(() => {
        cas = new CAS();
    })
    afterEach(() => {
      vi.restoreAllMocks()
    })

    it("Should redirect to home page if existing cas session", async function () {
        const urlParams = {
            ticket: "abc12345"
        }
      const response = await auth("verify", urlParams, 302, {"cas": { status: "active", ticket: "abc12345", netid: "jDoe" }});

      expect(response.redirect).toBe(true);
      expect(response.text).equals(`Found. Redirecting to ${process.env.CLIENT_URL + "/home"}`);
      expect(cas.validate).not.toBeCalled();

    });

    it("Should redirect to home page if no ticket cas session", async function () {
        const urlParams = {}
      const response = await auth("verify", urlParams, 302);

      expect(response.redirect).toBe(true);
      expect(response.text).equals(`Found. Redirecting to ${process.env.CLIENT_URL + "/home"}`);
      expect(cas.validate).not.toBeCalled();
    });

    it("Should create new cas session and redirect to home page if ticket valid", async function () {
        const urlParams = {
            ticket: "abc12345"
        }
      const response = await auth("verify", urlParams, 302);

      expect(response.redirect).toBe(true);
      expect(response.text).equals(`Found. Redirecting to ${process.env.CLIENT_URL + "/home"}`);
      expect(cas.validate).toBeCalledTimes(1);
      expect(cas.validate).toBeCalledWith("abc12345", expect.any(Function));
    });

    it("Should fail if cas validation returns an error", async function () {
        const urlParams = {
            ticket: "error"
        }
      const response = await auth("verify", urlParams, 500);

      expect(response.redirect).toBe(false);
      expect(response.error.text).equals("Server error in verifying ticket!");
      expect(response.error.status).equals(500);
      expect(cas.validate).toBeCalledTimes(1);
      expect(cas.validate).toBeCalledWith("error", expect.any(Function));
    });
  });

  // TODO: Update to use environment variable
  async function auth(path, urlParams, status = 200, cookies = {}) {
    let cookie = mockSession('session', 'Shsh!Secret!', cookies); 
    const response = await request(app)
      .get(`/auth/${path}`)
      .query(urlParams)
      .set("Content-Type", "application/json")
      .set('cookie', [ cookie ])
      .expect(status);
    return response;
  }
});