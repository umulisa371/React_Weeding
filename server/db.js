require("dotenv").config();

const mongoose = require("mongoose");

console.log("db.js loaded");

const connectDB = async () => {
  console.log("Trying to connect to MongoDB...");

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;