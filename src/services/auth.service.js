import { createUser, getDisplayName, retrieveUser } from "../utils/db.util.js";
import axios from 'axios';

export async function getUserByNetid(netid) {
  try {
    console.log("Getting user with netid: " + netid);
    let user = await retrieveUser(netid);
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

export async function getUserByUserInfo(userInfo) {
  try {
    console.log("Getting user with email: " + userInfo.email);
    let user = await retrieveUser(userInfo.email);
    if (!user) {
      console.log("No user found, so creating user");
      const displayName = `${userInfo.given_name} ${userInfo.family_name}`
      user = await createUser(userInfo.email, displayName);
    }
    return user;
  } catch (error) {
    console.error("Errow while getting user: " + error);
    return null;
  }
}

export async function getAccessTokenFromCode(code) {
  try {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.SERVER_URL}/auth/google`,
        grant_type: 'authorization_code',
        code,
      },
    });
    console.log(data); // { access_token, expires_in, token_type, refresh_token }
    return data.access_token;
  } catch (error) {
    console.error("Errow while getting access token: " + error);
    return null;
  }
};

export async function getGoogleUserInfo(access_token) {
  try {
    const { data } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(data); // { id, email, given_name, family_name }
    return data;
  } catch (error) {
     console.error("Errow while getting access token: " + error);
    return null;
  }
};
