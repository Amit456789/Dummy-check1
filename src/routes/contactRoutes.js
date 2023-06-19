// import express from "express";
// const router = express.Router();

// import { ContactCreate, ContactDetails } from "../controllers/contactController.js"
// import { ContactValidation } from "../Validations/contactValidation.js";
// // import { errors } from "../ErrorHandler/errors.js";

//ES5 Chsanges
const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController.js");
const contactValidation = require("../Validations/contactValidation.js");

const ContactCreate = contactController.ContactCreate;
const ContactDetails = contactController.ContactDetails;
const ContactValidation = contactValidation.ContactValidation;


router.post("/contact", ContactValidation, ContactCreate);
router.get("/contact", ContactDetails);

module.exports = { router };
