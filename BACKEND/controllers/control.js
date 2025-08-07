import {User} from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendMail from '../middleware/sendMail.js';

export const registerUser = async (req,res) =>{
    try{
        console.log(req.body);
        const {name, email, password, contact} = req.body;


        // code to be email already exists
        let user= await User.findOne({email});
        if(User){
            res.status(400).json({
                message : 'User Email Already Exists',
            })
        }
        // code to be  decrypt to encrypt 
        const hashPassword = await bcrypt.hash(password, 10);

        // OTP Genareter 
        const otp=Math.floor(Math.randem() * 1000000);

        // Create signed activation tokan
        const activationTokan=jwt.sign({User, otp},process.env.ACTIVATION_SECRET, {expiresIn:'5m'},     
        );

        //  SentMail to User
        const message = `Please Verify Your Account Using OTP is ${otp}`;
        await sendMail(email,"Welcome to you",message);
        res.status(200).json({
            message:"OTP send to your mail",
            activationTokan,   
        })

    }catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
} 