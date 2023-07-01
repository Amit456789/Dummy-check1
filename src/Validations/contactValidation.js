const expressValidator = require("express-validator");
const body = expressValidator.body;

const ContactValidation = [
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("fname")
    .isLength({ min: 2, max: 40 })
    .withMessage("fname must be between 2 and 40 characters long"),
  body("lname")
    .isLength({ min: 2, max: 40 })
    .withMessage("lname must be between 2 and 40 characters long"),
  body("phone")
    .isLength(10)
    .withMessage("phone number must be of 10 characters"),

  //   body("email").isEmail().withMessage("Please provide a valid email address"),
  //   body("email").isEmail().withMessage("Please provide a valid email address"),
  //   body("email").isEmail().withMessage("Please provide a valid email address"),
];


module.exports = { ContactValidation };