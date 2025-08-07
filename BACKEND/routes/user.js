import express from "express";
import { registerUser, VerifyUser } from "../controllers/control.js";

const router = express.Router();
// console.log('hello');

// post method
    router.post("/user/register", registerUser)
    router.post("/user/verify", VerifyUser)

export default router;