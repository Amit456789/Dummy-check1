// import express from "express";
// import mongoose from "mongoose";
//  = customErrorMessages;
const express = require("express");
const mongoose = require("mongoose");

const ContactShema = new mongoose.Schema({
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
  message: {
    type: String,
    trim: true,
    required: true,
  },
  org: {
    type: String,
    trim: true,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});
exports.ContactModel = mongoose.model("Contact", ContactShema,);
