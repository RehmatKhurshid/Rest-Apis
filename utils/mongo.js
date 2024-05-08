import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/rest1');
        console.log('mongoose connected');
    } catch (error) {
        console.log('something went wrong n mongodb')
    }

}