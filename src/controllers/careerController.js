const { sendEmail } = require("../email");
const path = require("path");
const validationResult = require("express-validator").validationResult;
const CareerModel = require("../models/careerModel.js").CareerModel;
const careerValidation =
  require("../Validations/CareerValidation.js").careerValidation;

exports.CareerCreate = async (req, res) => {
  const datum = JSON.parse(req.body.document);
  const protocol = req.protocol;
  console.log("Protocol inside career", protocol);
  let result = careerValidation(datum);
  if (result.error) {
    console.log(
      result.error.details[0].message,
      "Error++++++++++++++++++++++++"
    );
    return res.status(400).json({
      success: false,
      Error: result.error.details[0].message,
    });
  }
  // console.log(req?.file, "Filessssss");
  if (req?.file) {
    datum.cv = `${`https://klimart-backend.onrender.com`}/public/${
      req?.file?.filename
    }`;
  } else {
    return res.status(400).json({
      success: false,
      Error: `Please upload a pdf`,
    });
  }

  // datum.cv = `${process.env.URL}/public/${req?.file?.filename.trim()}`;

  try {
    let payload = await CareerModel.create(datum);
    const { fname, lname, contact, city, experience, email, education, cv } =
      datum;
    const obj = {
      Heading: `Candidate Profile Details`,
      name: fname + " " + lname,
      contact,
      city,
      experience: `${experience} Years`,
      email,
      education,
      cv,
    };
    console.log("This is to check path in career", __dirname);
    //This route is to send the mail to a user
    sendEmail(
      "a0423355@gmail.com",
      "New Job Application Request",
      "Welcome message content",
      obj,
      req?.file?.filename.trim()
    );
    // console.log("Payload", payload);
    res.status(200).json({
      data: payload,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: error.message,
    });
  }
};
exports.CareerDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let payload = await CareerModel.find();
  try {
    res.status(200).json({
      data: payload,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: error.message,
    });
  }
  // console.log(payload)
};
