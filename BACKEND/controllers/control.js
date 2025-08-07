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
      { expiresIn: "5m" }
    );

    // Send Email to use
    const emailText = `Please Verify your account using OTP. Your OTP is ${otp}`;
    await sendMail(email, "Welcome to E-COMMERCE", emailText);

    res.status(200).json({
      message: "OTP Sent to your mail",
      activationToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Verify OTP
export const VerifyUser = async (req, res) => {
  try {
    const {otp,activationToken} = req.body;
    const verify=jwt.verify(activationToken,process.env.ACTIVATION_SECRET)
    if(!verify){
      return res.json({
        message:"OTP Expired Resend OTP",
    });
    }
    if(verify.otp !== otp){
      return res.json({
        message:"Worng OTP Try Again",
    });
    }

    await User.create({
      name:verify.user.name,
      email:verify.user.email,
      hashPassword:verify.user.hashPassword,
      contact:verify.user.contact,
    });

    res.status(200).json({
      message: "Registration Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
