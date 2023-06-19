// import Joi from "joi";
//ES5
//All the input fields are necessary to validate it from JOI.
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email(),
  fname: Joi.string().min(2).max(40),
  lname: Joi.string().min(2).max(40),
  contact: Joi.number().integer().min(1000000000).max(9999999999).required(),
  city: Joi.string(),
  education: Joi.string(),
  experience: Joi.number().integer(),
});
exports.careerValidation = (data) => {
  console.log("Data", data);
  const result = schema.validate(data);
  return result;
};

//  default careerValidation;
