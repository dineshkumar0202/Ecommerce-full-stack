import { Product } from "../models/Product.js";

// Add new product
export const createProduct = async (req, res) => {
  try {
    // check user role
    if (req.user.role != "admin") {
      return res.status(403).json({
        message: "Unauthorized Access",
      });
    }
    const { title, description, category, price, stock } = req.body;
    const image = req.file;
    if (!image) {
      return res.status(400).json({
        message: "Please select the image",
      });
    }
    // Store to DB
    const product = await Product.create({
      title,
      description,
      category,
      price,
      stock,
      image: image?.path,
    });
    res.status(201).json({
      message: "Product Details added Success",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
