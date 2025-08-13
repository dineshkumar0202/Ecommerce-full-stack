import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../middleware/Multer.js";
import {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
  DeleteProduct,
  updateStock,
} from "../controllers/cProduct.js";

const router = express.Router();

router.post("/product/new", isAuth, uploadFiles, createProduct);
router.get("/product/all-products", fetchAllProducts);
router.get("/product/single/:id", fetchSingleProduct);
router.delete("/product/:id", isAuth, DeleteProduct);
router.put("/product/:id", isAuth, updateStock);

export default router;
