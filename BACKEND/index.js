import express from "express";
import dotenv from "dotenv";
import connectDB from './Database/db.js';

const app = express();
dotenv.config();
const port = process.env.PORT;



app.get('/', (req,res) => {
    res.send('<h1>Hello</h1>')
})

app.listen(port, ()=>{
    console.log(`Server running in port ${port}`);
    connectDB();
})