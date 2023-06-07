import express from "express";
import mongoose from "mongoose";
//  = customErrorMessages;

const ContactShema = new mongoose.Schema({
  fname: {
    type: String,
    // required: [true, firstnameErrorMessages.required],
    // minlength: [2, firstnameErrorMessages.minLength],
    // maxlength: [30, firstnameErrorMessages.maxLength],
    trim: true,
    required: true,
  },
  lname: {
    type: String,
    // required: [true, lastnameErrorMessages.required],
    // minlength: [2, lastnameErrorMessages.minLength],
    // maxlength: [30, lastnameErrorMessages.maxLength],
    trim: true,
    required: true,
  },
  message: {
    type: String,
    // required: [true, messageErrorMessages.required],
    // minlength: [5, messageErrorMessages.minLength],
    // maxlength: [100, messageErrorMessages.maxLength],
    trim: true,
    required: true,
  },
  org: {
    type: String,
    // required: [true, orgErrorMessages.required],
    // minlength: [3, orgErrorMessages.minLength],
    // maxlength: [20, orgErrorMessages.maxLength],
    trim: true,
    required: true,
  },
  subject: {
    type: String,
    // required: [true, subjectErrorMessages.required],
    // minlength: [5, subjectErrorMessages.minLength],
    // maxlength: [20, subjectErrorMessages.maxLength],
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    // required: [true, phoneNumberErrorMessages.required],
    // minlength: [10, phoneNumberErrorMessages.minLength],
    // maxlength: [10, phoneNumberErrorMessages.minLength],
    required: true,
  },
});
export const ContactModel = mongoose.model("Contact", ContactShema);
