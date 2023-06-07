import mongoose from "mongoose";
//  = customErrorMessages;

const CareerSchema = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
    required: true,
  },
  lname: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  education: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
});
export const CareerModel = mongoose.model("Carrer", CareerSchema);
