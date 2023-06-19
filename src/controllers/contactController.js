// import { ContactModel } from "../models/contactModel.js"
// import { validationResult } from "express-validator";

//ES5
const ContactModel = require("../models/contactModel.js").ContactModel;
// const validationResult = require("express-validator").validationResult;

// const contactModel = require("../models/contactModel.js").ContactModel;
const validationResult = require("express-validator").validationResult;

exports.ContactCreate = async (req, res) => {
  console.log("inside the contact route");
  console.log("inside the contact", req.body);
  // const errors = validationResult(req.body);
  // if (!errors.isEmpty()) {
  //   return res.status(200).json({
  //     errors: errors.array(),
  //   });
  // }
  try {
    let payload = new ContactModel(req.body);
    await payload.save();
    console.log("This is ciontxcat", req.body);
    res.status(200).json({
      data: payload,
    });
  } catch (error) {
    res.status(200).json({
      status: false,
      Error: error.message,
    });
  }
};
exports.ContactDetails = async (_, res) => {
  try {
    let data = await ContactModel.find();
    res.status(200).json({
      data,
      status: true,
    });
  } catch (error) {
    res.status(200).json({
      status: false,
      Error: error.message,
    });
  }
};
