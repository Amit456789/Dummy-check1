// import mongoose from "mongoose";
// import dotenv from "dotenv";


// ES5

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
exports.connection = mongoose.connect(process.env.MONGO_DB_URL);
