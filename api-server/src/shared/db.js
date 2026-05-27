import config from "../config/index.js";
import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("🔗 Successfully connected to MongoDB infrastructure. Chief 🫡")
    } catch (error) {
        console.error("Database connection critical failures:", error.message);
        process.exit(1)
    }
};