import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require:true,
    },
    quantity: {
        type:Number,
        require:true, 
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    }
})

export const Cart = mongoose.Cart("Cart", schema);