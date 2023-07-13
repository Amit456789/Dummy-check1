// import { ContactModel } from "../models/contactModel.js"
// import { validationResult } from "express-validator";

//ES5
const ContactModel = require("../models/contactModel.js").ContactModel;
// const validationResult = require("express-validator").validationResult;

// const contactModel = require("../models/contactModel.js").ContactModel;
const validationResult = require("express-validator").validationResult;

exports.ContactCreate = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let payload = await ContactModel.create(req.body);
    res.status(200).json({
      data: payload,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      Error: error?.message,
    });
  }

  // res.send("Data");
};
exports.ContactDetails = async (_, res) => {
  try {
    let data = await ContactModel.find();
    res.status(200).json({
      data,
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: error.message,
    });
  }
};
