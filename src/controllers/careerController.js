const validationResult = require("express-validator").validationResult;
const CareerModel = require("../models/careerModel.js").CareerModel;
const careerValidation =
  require("../Validations/CareerValidation.js").careerValidation;

exports.CareerCreate = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(200).json({
  //     errors: errors.array(),
  //   });
  // }
  const datum = JSON.parse(req.body.document);
  console.log("This is body", datum.city);
  let result = careerValidation(datum);
  // console.log("error", result.error);
  if (result.error) {
    return res.status(200).json({
      success: false,
      msg: result.error,
    });
  }
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
  try {
    let payload = await CareerModel.create(datum);
    console.log("uploadeObj", payload);
    res.status(200).json({
      data: payload,
    });
  } catch (error) {
    res.status(200).json({
      status: false,
      Error: error.message,
    });
  }
};
exports.CareerDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({
      errors: errors.array(),
    });
  }
  // let payload = {...data,req.body}
  // console.log("req.body=========================", req.body);
  // console.log("req.files=========================", req.files);
  let payload = await CareerModel.find();
  try {
    res.status(200).json({
      data: payload,
    });
  } catch (error) {
    res.status(200).json({
      status: false,
      Error: error.message,
    });
  }
  // console.log(payload)
};
