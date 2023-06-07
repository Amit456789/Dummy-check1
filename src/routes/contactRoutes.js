import { ContactModel } from "../models/contactModal.js";
import { validationResult } from "express-validator";
export const ContactCreate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({
      errors: errors.array(),
    });
  }
  //   const { email } = req.body;
  //   let data = await ContactModel.find({ email });
  //   if (data) {
  //     res.status(400).json({
  //       success: false,
  //       message:"This email is already registerd please trey with a new one"
  //   })
  // }
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
