import { ContactModel } from "../models/contactModel.js"
import { validationResult } from "express-validator";
export const ContactCreate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({
      errors: errors.array(),
    });
  }

  let payload = await ContactModel.create(req.body);
  res.status(200).json({
    data: payload,
  });
  // res.send("Data");
};
export const ContactDetails = async (_, res) => {
  let data = await ContactModel.find();
  res.send(data);
};
