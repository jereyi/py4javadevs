import "openai/shims/node";
import request from "supertest";
import app from "../index.js";
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock("../services/chatGpt.service.js", () => {
  const APIcall = (code) => { 
    if (code === "error") {
      throw new Error("Chat GPT Error");
    } else {
      return "Chat GPT response";
    }
  }; 

  return { APIcall }
})

describe("chat-gpt route", function () {
  describe("GET /", function () {
    afterEach(() => {
      vi.restoreAllMocks()
    })

    it("Should return Chat GPT output", async function () {
      const req = {
        // eslint-disable-next-line no-multi-str
        code: "class Solution(object): \
        def subsets(self, nums):\
            subsets = [frozenset()]\
            for num in nums:\
                newSubsets = []\
                for subset in subsets:\
                    newSubset = [num]\
                    newSubset += subset\
                    newSubsets.append(frozenset(newSubset))\
                subsets += newSubsets\
            return subsets\
            ",
      };
      const response = await chatGpt(req);

      expect(response.body).equals("Chat GPT response");
    });

    it("Should fail if Chat GPT throws an error", async function () {
      const req = {
        code: "error"
      };
      const response = await chatGpt(req, 500);

      // eslint-disable-next-line jest/valid-expect
      expect(response.text).to.equal(`Error while querying Chat GPT`);
    });
  });

  async function chatGpt(req, status = 200) {
    const response = await request(app)
      .post("/chat-gpt")
      .send(req)
      .set("Content-Type", "application/json")
      .expect(status);
    return response;
  }
});
