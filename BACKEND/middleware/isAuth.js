import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({ message: "Please Login to access" });
    }

    // Decode JWT
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeData._id);
    
    if (!req.user) {
      return res.status(403).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Please Login to access" });
  }
};
