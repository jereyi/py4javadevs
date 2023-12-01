import "cookie-session";
import CAS from "cas";
import { getUserByNetid, getUserByUserInfo, getAccessTokenFromCode, getGoogleUserInfo } from "../services/auth.service.js";
import dotenv from 'dotenv';
import e from "express";
dotenv.config()

var cas = new CAS({
  base_url: process.env.CAS_ENDPOINT,
  service: process.env.SERVER_URL + "/auth/verify",
});

export async function verify(req, res) {
  try {
    // Check if the user has a redirection destination
    let redirectDestination =
      process.env.SERVER_URL + "/home";

    // If the user already has a valid CAS session then send them to their destination
    if (req.session.cas) {
      console.log("Existing valid cas session: " + JSON.stringify(req.session.cas))
      res.redirect(redirectDestination);
      return;
    }

    var ticket = req.query.ticket;
    console.log(ticket);
    // If the user does not have a ticket then send them to the homepage
    if (typeof ticket === "undefined") {
      console.log("No ticket");
      res.redirect(process.env.SERVER_URL + "/home");
      return;
    }

    // Check if the user's ticket is valid
    await cas.validate(ticket, function (err, status, netid) {
      if (err || !status) {
        console.log("Error in cas validation: " + JSON.stringify(err));
        res.error(err).status(500);
        return;
      }
      // Save the user's session data
      req.session.cas = {
        status: status,
        ticket: ticket,
        netid: netid,
      };
      console.log("Beginning cas session: " + JSON.stringify(req.session.cas))
      res.redirect(redirectDestination);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error in verifying ticket!");
  }
}

export async function google(req, res) {
  const code = req.query.code;
  if (!code) {
    console.log(`Google Login Failed to Return a Code`);
    res.status(500).send("Server error in Google Login!");
    return;
  }
  console.log(`The code is: ${code}`);
  const accessToken = await getAccessTokenFromCode(code);
  if (!accessToken) {
    console.log(`Google Login Failed to Return an Access Token`);
    res.status(500).send("Server error in Google Login!");
    return;
  }
  const userInfo = await getGoogleUserInfo(accessToken);
  if (!userInfo) {
    console.log(`Google Login Failed to Return User Info`);
    res.status(500).send("Server error in Google Login!");
    return;
  }
  req.session.google = {
    id: userInfo.id,
    email: userInfo.email,
    given_name: userInfo.given_name,
    family_name: userInfo.family_name
  }
  console.log("Beginning Google login session: " + JSON.stringify(req.session.google))
  res.redirect(process.env.SERVER_URL + "/home");

}

export async function getUser(req, res) {
  console.log("CAS " + JSON.stringify(req.session.cas));
  if (req.session.cas?.netid) {
    console.log("CAS session exists");
    const user = await getUserByNetid(req.session.cas.netid);
    console.log("user " + JSON.stringify(user));
    if (user) {
      res.json(JSON.stringify(user));
      return;
    } 
  } else if (req.session.google?.email) {
    console.log("Google Login session exists");
    const user = await getUserByUserInfo(req.session.google);
    console.log("user " + JSON.stringify(user));
    if (user) {
      res.json(JSON.stringify(user));
      return;
    } 
  }
  res.status(404).send("User not found");
}
