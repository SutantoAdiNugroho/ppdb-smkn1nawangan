import jwt from "jsonwebtoken";
import CryptoJs from "crypto-js";

export const verify = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  var bytes = CryptoJs.AES.decrypt(token, process.env.REACT_APP_JWT_SECRET_KEY);
  var plaintext = bytes.toString(CryptoJs.enc.Utf8);

  var decoded = jwt.verify(plaintext, process.env.REACT_APP_JWT_SECRET_KEY);

  if (token) return decoded;
};
