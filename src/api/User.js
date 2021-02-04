import axios from "axios";

const logUserIn = async ({ username, password }) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/login",
      { username, password },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const signUserUp = async ({
  username,
  email,
  password,
  country,
  displayName,
}) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/register",
      { username, email, password, country, displayName },
      { withCredentials: true }
    );
  } catch (err) {
    return null;
  }
};

const getAccessToken = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/token",
      {},
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
const getUserDetails = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/user",
      {},
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const logUserOut = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/logout",
      {},
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export { logUserIn, getAccessToken, getUserDetails, logUserOut, signUserUp };
