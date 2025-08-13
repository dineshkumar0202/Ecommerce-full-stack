import { Product } from "../models/Product.js";
import { rm } from "fs";

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
    return res.status(201).json({
      message: "Product Details added Success",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// fetch all product

export const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "List of Products",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// fetch single product

export const fetchSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findById(id);
    res.status(200).json({
      message: "Product Details",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete product
export const DeleteProduct = async (req, res) => {
  // Check admin role
  try {
    if (req.user.role != "admin") {
      return res.status(403).json({
        message: "Unauthorized Access",
      });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(403).json({
        message: "Product not found",
      });
    }
    rm(product.image, () => {
      console.log("Image Deleted ");
    });

    await product.deleteOne();
    return res.json({
      message: "Product Details Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// update stock details
export const updateStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (req.user.role != "admin") {
      return res.status(403).json({
        message: "Unauthorized Access",
      });
    }
    if (!product) {
      return res.status(403).json({
        message: "Product not found",
      });
    }
    if (req.body.stock) {
      product.stock = req.body.stock;
      await product.save();
      return res.json({
        message: "Product Stock Updated Successfully",
      });
    }
    return res.status(400).json({
      message: "Please Enter stock Values",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
