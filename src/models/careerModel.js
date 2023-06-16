// const express = require("express");
const mongoose = require("mongoose");

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
  cv: String,
});
const CareerModel = mongoose.model("Carrer", CareerSchema);
module.exports = { CareerModel };
