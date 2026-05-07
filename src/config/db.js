import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        const DB_URI = process.env.MONGODB_URL || "";
        mongoose.connect(DB_URI);
        console.log("MongoDB Connect... ✅");

    }
    catch(err){
        console.error("Databse Connection Error:", err.message);
        process.exit(1)
    }
}
