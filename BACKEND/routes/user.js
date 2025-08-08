import express from "express";
import { registerUser, VerifyUser,loginUser, myProfile} from "../controllers/control.js";
import {isAuth} from '../middleware/isAuth.js';

const router = express.Router();
// console.log('hello');

// post method
    router.post("/user/register", registerUser);
    router.post("/user/verify", VerifyUser);
    router.post("/user/login", loginUser);
    router.get("/user/profile", isAuth , myProfile);

export default router;  