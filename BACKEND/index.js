import express from "express";
import dotenv from "dotenv";
import connectDB from './database/db.js';

// import routs
import userRoutes from './routes/user.js';
import productRoutes from './routes/routeProduct.js';


const app = express();
dotenv.config();
const port = process.env.PORT;

// middle wares
app.use(express.json());

// static files
app.use("./uploads",express.static("uploads"));


// using routes
app.use('/api/', userRoutes);
app.use('/api/', productRoutes);



app.get('/', (req,res) => {
    res.send('<h1>Hello</h1>')
})

app.listen(port, ()=>{
    console.log(`Server running in port ${port}`);
    connectDB();
})