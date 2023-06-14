
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

