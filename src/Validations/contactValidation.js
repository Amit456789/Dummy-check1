import { body } from "express-validator";

export const ContactValidation = [
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("fname")
    .isLength({ min: 2, max: 20 })
    .withMessage("fname must be between 8 and 20 characters long"),
  body("lname")
    .isLength({ min: 2, max: 20 })
    .withMessage("lname must be between 8 and 20 characters long"),
  body("phone")
    .isLength(10)
    .withMessage("phone number must be of 10 characters"),

  //   body("email").isEmail().withMessage("Please provide a valid email address"),
  //   body("email").isEmail().withMessage("Please provide a valid email address"),
  //   body("email").isEmail().withMessage("Please provide a valid email address"),
];
