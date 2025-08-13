import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";

export const registerUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, contact } = req.body;

    // Check user(Email) already exists
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "User Email Already Exists",
      });
    }

    // bcrypt Password ( Raw to Hashed Password )
    const hashPassword = await bcrypt.hash(password, 10);

    // Generate OTP (Email OTP)
    const otp = Math.floor(Math.random() * 1000000);

    // create new user data
    user = { name, email, hashPassword, contact };

    // Create Signed activation Token
    const activationToken = jwt.sign(
      { user, otp },
      process.env.ACTIVATION_SECRET,
      { expiresIn: "10m" }
    );

    // Send Email to use
    const message = `Please Verify your account using OTP. Your OTP is ${otp}`;
    await sendMail(email, "Welcome to E-COMMERCE", message);

    return res.status(200).json({
      message: "OTP Sent to your mail",
      activationToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Verify OTP
export const VerifyUser = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;

    let verify;
    try {
      verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    } catch (jwtError) {
      if (jwtError.name === "TokenExpiredError") {
        return res.json({
          message: "OTP Expired",
        });
      }
      return res.json({
        message: "Invalid Token",
      });
    }

    if (!verify) {
      return res.json({
        message: "OTP Expired",
      });
    }

    // Convert both to numbers for comparison
    const tokenOtp = parseInt(verify.otp);
    const userOtp = parseInt(otp);

    if (tokenOtp !== userOtp) {
      return res.json({
        message: "Wrong OTP Try Again",
      });
    }

    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: verify.user.hashPassword,
      contact: verify.user.contact,
    });

    return res.status(200).json({
      message: "Registration Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user email id
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email ? ",
      });
    }
    // check password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        message: "Invalid Password ?",
      });
    }
    // Generate signed token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    // exclude the password feild befor sending the response
    const { password: userPassword, ...userdetails } = user.toObject();

    return res.status(200).json({
      message: "Welcome" + user.name,
      token,
      user: userdetails,
    });
  } catch (error) {
    // console.log("hii");
    return res.status(500).json({
      message: error.message,
    });
  }
};

// User Profile

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
