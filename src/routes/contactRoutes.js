

//ES5 Chsanges
const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController.js");
const contactValidation = require("../Validations/contactValidation.js");

const ContactCreate = contactController.ContactCreate;
const ContactDetails = contactController.ContactDetails;
const ContactValidation = contactValidation.ContactValidation;
console.log("COntact")

router.post("/", ContactValidation, ContactCreate);
router.get("/", ContactDetails);
router

module.exports = router
