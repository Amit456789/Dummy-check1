// import Joi from "joi";
//ES5
//All the input fields are necessary to validate it from JOI.
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().message({
    "string.email": "Email ID is not valid.",
  }),
  name: Joi.string().min(2).max(40),

  contact: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 10 - 1)
    .required()
    .messages({
      "number.min": "Mobile number should be 10 digit.",
      "number.max": "Mobile number should be 10 digit",
    }),
  bhk: Joi.string(),
  budget: Joi.string(),
  area: Joi.string(),
  location: Joi.string(),
  category: Joi.string(),
  subCategory: Joi.string(),
});
exports.getInTouchValidation = (data) => {
  console.log("Data", data);
  const result = schema.validate(data);
  return result;
};

//  default careerValidation;
