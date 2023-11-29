import { createUser, getDisplayName, retrieveUser } from "../utils/db.util.js";

export async function getUserByNetid(netid) {
  try {
    console.log("Getting user with netid: " + netid);
    let user = await retrieveUser(netid);
    console.log("user by net " + user);
    if (!user) {
      console.log("No user found, so creating user");
      const displayName = await getDisplayName(netid);
      user = await createUser(netid, displayName);
    }
    return user;
  } catch (error) {
    console.error("Errow while getting user: " + error);
    return null;
  }
}
