import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const mongoDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log("MongoDB connected")
    }   
    catch(error){
        console.log("MongoDB connection error", error)
    }
}