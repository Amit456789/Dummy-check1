
// import Joi from "joi";
//ES5
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email(),
  fname: Joi.string().min(2).max(40),
  lname: Joi.string().min(2).max(40),
  phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
  city:Joi.string().empty()
});
exports.careerValidation = (data) => {
  console.log("Data", data);
  const result = schema.validate(data);
  return result;
};

//  default careerValidation;

