import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'User',
    },
    contact:{
        type:String,
        required:true,
    },

}, {timeseries: true}
);

export const User = mongoose.model('User', Schema);