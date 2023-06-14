import { validationResult } from "express-validator";
import { CareerModel } from "../models/careerModel.js";
import { careerValidation } from "../Validations/CareerValidation.js";
export const CareerCreate = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(200).json({
  //     errors: errors.array(),
  //   });
  // }
  const datum = JSON.parse(req.body.document);
  // let result = careerValidation(datum);
  // console.log("error", result.error);
  // if (result.error) {
  //   return res.status(200).json({
  //     success: false,
  //     msg: result.error,
  //   });
  // }
  datum.cv = `${process.env.URL}/public/${req?.file?.filename}`;

  // let { fname, lname, city, education, email, contact, experience ,phone} = req.body;
  // // fname = fname.trim();
  // const uploadeObj = {
  //   fname,
  //   lname,
  //   city,
  //   education,
  //   email,
  //   contact,
  //   experience,
  //   phone,
  //   cv: `${process.env.URL}/public/${req?.file?.filename}`,
  // };
  let payload = await CareerModel.create(datum);
  // console.log(uploadeObj);
  res.status(200).json({
    data: payload,
  });
};
export const CareerDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({
      errors: errors.array(),
    });
  }
  // let payload = {...data,req.body}
  console.log("req.body=========================", req.body);
  console.log("req.files=========================", req.files);
  let payload = await CareerModel.find();
  // console.log(payload)
  res.status(200).json({
    data: payload,
  });
};
