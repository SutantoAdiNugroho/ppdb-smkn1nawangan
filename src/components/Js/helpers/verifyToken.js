import jwt from "jsonwebtoken"

export const verify = () => {
    const token = JSON.parse(localStorage.getItem("token"))

    var decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY)

    return decoded;
}