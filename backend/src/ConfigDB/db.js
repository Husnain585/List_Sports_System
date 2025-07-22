const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const MONGO_URL = process.env.MONGO_URL;

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to Database");
    } catch (error) {
        console.error("Database Connection error:", error);
    }
};

module.exports = ConnectDB;
