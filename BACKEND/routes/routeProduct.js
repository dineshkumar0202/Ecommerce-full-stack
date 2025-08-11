import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../middleware/Multer.js";
import { createProduct } from "../controllers/cProduct.js";

const router = express.Router();

router.post("/product/new", isAuth, uploadFiles, createProduct);

export default router;