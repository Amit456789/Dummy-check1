import mongoose from "mongoose";
//  = customErrorMessages;

const CareerSchema = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
  },
  lname: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  education: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  contact: {
    type: Number,
  },
  experience: {
    type: Number,
  },
})
export const CareerModel = mongoose.model("Carrer", CareerSchema);
