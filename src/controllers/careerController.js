const { sendEmail } = require("../email");
const path = require("path");
const validationResult = require("express-validator").validationResult;
const CareerModel = require("../models/careerModel.js").CareerModel;
const careerValidation =
  require("../Validations/CareerValidation.js").careerValidation;

exports.CareerCreate = async (req, res) => {
  const datum = JSON.parse(req.body.document);
  const protocol = req.protocol;
  // console.log("Protocol inside career", protocol);
  let result = careerValidation(datum);
  if (result.error) {

    return res.status(400).json({
      success: false,
      Error: result.error.details[0].message,
    });
  }
  // console.log(req?.file, "Filessssss");

  // datum.cv = `${process.env.URL}/public/${req?.file?.filename.trim()}`;

  try {
    if (req?.file) {
      datum.cv = `${`https://klimart-backend.onrender.com`}/public/${req?.file?.filename
        }`;
    } else {
      return res.status(400).json({
        success: false,
        Error: `Please upload a pdf`,
      });
    }

    let payload = await CareerModel.create(datum);
    const { fname, lname, contact, city, experience, email, education, cv } =
      datum;
    const way = req.file.filename.trim();

    const obj = {
      Heading: `Candidate Profile Details`,
      name: fname + " " + lname,
      contact,
      city,
      experience: `${experience} Years`,
      email,
      education,
      cv,
      way,
    };
    //This route is to send the mail to a user
    sendEmail(
      "a0423355@gmail.com",
      "New Job Application Request",
      "Welcome message content",
      obj
    );
    // console.log("Payload", payload);
    res.status(200).json({
      success: true,
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
