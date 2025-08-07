import express from "express";
import { registerUser } from "../controllers/control.js";

const router = express.Router();

// post method
    router.post("/User/register", registerUser)

export default router;