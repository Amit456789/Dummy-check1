

//ES5 Chsanges
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth")

const contactController = require("../controllers/contactController.js");
const contactValidation = require("../Validations/contactValidation.js");

const ContactCreate = contactController.ContactCreate;
const ContactDetails = contactController.ContactDetails;
const ContactValidation = contactValidation.ContactValidation;
console.log("COntact")

router.post("/", protect, ContactValidation, ContactCreate);
router.get("/", protect, ContactDetails);
router

module.exports = router
