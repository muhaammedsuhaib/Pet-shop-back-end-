import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const userToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({ message: "Token not provided" });
    }
    Jwt.verify(token, process.env.USER_JWT, (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.email = decode.email;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
    next(error);
  }
};
