// import { ContactModel } from "../models/contactModel.js"
// import { validationResult } from "express-validator";


//ES5
const ContactModel = require("../models/contactModel.js").ContactModel;
// const validationResult = require("express-validator").validationResult;

// const contactModel = require("../models/contactModel.js").ContactModel;
const validationResult = require("express-validator").validationResult;

exports.ContactCreate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({
      errors: errors.array(),
    });
  }
console.log("This is ciontxcat",req.body)
  let payload = await ContactModel.create(req.body);
  res.status(200).json({
    data: payload,
  });
  // res.send("Data");
};
exports.ContactDetails = async (_, res) => {
  let data = await ContactModel.find();
  res.send(data);
};
