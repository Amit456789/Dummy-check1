// import { body } from "express-validator";

// export const CareerValidation = [
//   body("email").isEmail().withMessage("Please provide a valid email address"),
//   body("fname")
//     .isLength({ min: 2, max: 20 })
//     .withMessage("fname must be between 8 and 20 characters long"),
//   body("lname")
//     .isLength({ min: 2, max: 20 })
//     .withMessage("lname must be between 8 and 20 characters long"),
//   body("phone")
//     .notEmpty()
//     .withMessage("Phone Number is required")
//     .isLength(10)
//     .withMessage("phone number must be of 10 characters"),
//   body("city").notEmpty().withMessage("City name is required"),
//   body("phone").notEmpty().withMessage("City name is required"),
//   // body("cv").notEmpty()
// ];
// // import { body } from "express-validator";
// export const CareerValidation = [
//   body("data.fname")
//     .isLength({ min: 2, max: 20 })
//     .withMessage("fname must be between 2 and 20 characters long"),
//   body("data.lname")
//     .isLength({ min: 2, max: 20 })
//     .withMessage("lname must be between 2 and 20 characters long"),

import Joi from "joi";
const schema = Joi.object({
  email: Joi.email(),
  fname: Joi.string().min(2).max(40),
  lname: Joi.string().min(2).max(40),
  phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
  city:Joi.string().empty()
});
export const careerValidation = (data) => {
  console.log("Data", data);
  const result = schema.validate(data);
  return result;
};

//  default careerValidation;
