import axios from "axios";
import  { pool } from "../db.cjs";

export async function createUser(netid, displayName) {
  try {
    const response = await pool.query(
      "INSERT INTO users (net_id, display_name) VALUES ($1, $2)",
      [netid, displayName]
    );
    console.log(`Added a user with the netid ${netid}`);
    return response;
  } catch (error) {
    console.error("Error while creating user: " + error)
    return null;
  }
}

export async function retrieveUser(netid) {
  try {
    const res = await pool.query("SELECT * FROM users WHERE net_id = ($1)", [netid]);
    console.log(res.rows.at(0));
    return res.rows.at(0);
  } catch (error) {
    console.error("Error while retrieving user: " + error);
    return null;
  }
}

export async function getDisplayName(netid) {
    const options = {
      method: "GET",
      url: "https://api.princeton.edu:443/active-directory/1.0.5/users/basic",
      params: { uid: netid },
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
    };
    try {
      const response = await axios.request(options);
      console.log("Fetched user info: ", response.data);
      return response.data[0].displayname;
    } catch (err) {
      console.log("Error fetching user data: " + err);
      return "";
    }
  }
  