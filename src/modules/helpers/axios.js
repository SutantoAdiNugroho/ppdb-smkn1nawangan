import axios from "axios";
import CryptoJs from "crypto-js";

export const axiosReportsUsers = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_LOGIN_LIVE;
  axios.defaults.headers.common["X-API-KEY"] =
    process.env.REACT_APP_JWT_SECRET_KEY;

  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    var bytes = CryptoJs.AES.decrypt(
      token,
      process.env.REACT_APP_JWT_SECRET_KEY
    );
    var plaintext = bytes.toString(CryptoJs.enc.Utf8);

    axios.defaults.headers.common["Authorization"] = `Bearer ${plaintext}`;
  }
  return axios;
};
