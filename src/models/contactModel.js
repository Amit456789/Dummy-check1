// import express from "express";
// import mongoose from "mongoose";
//  = customErrorMessages;
const express = require("express");
const { version } = require("joi");
const mongoose = require("mongoose");

const ContactShema = new mongoose.Schema(
  {
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
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: "", // You should be aware of the outcome after set to false
  }
);
exports.ContactModel = mongoose.model("Contact", ContactShema);
