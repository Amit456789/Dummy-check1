// const express = require("express");
const mongoose = require("mongoose");

//  = customErrorMessages;

const GetInTouchSchema = new mongoose.Schema({
  bhk: String,
  budget: String,
  area: String,
  location: String,
  name: String,
  contact: String,
  email: String,
  category: String,
  subCategory: String,
});
const GetInTouchModel = mongoose.model("GetInTouch", GetInTouchSchema);
module.exports = { GetInTouchModel };
