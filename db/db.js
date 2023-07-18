// import mongoose from "mongoose";
// import dotenv from "dotenv";


// ES5

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
exports.connection = mongoose.connect("mongodb+srv://amit:amit@cluster0.nzlwx9h.mongodb.net/Klimart?retryWrites=true&w=majority");
