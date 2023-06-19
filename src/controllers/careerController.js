const validationResult = require("express-validator").validationResult;
const CareerModel = require("../models/careerModel.js").CareerModel;
const careerValidation =
  require("../Validations/CareerValidation.js").careerValidation;

exports.CareerCreate = async (req, res) => {
  const datum = JSON.parse(req.body.document);
  let result = careerValidation(datum);
  if (result.error) {
    return res.status(200).json({
      success: false,
      msg: result.error,
    });
  }
  datum.cv = `${process.env.URL}/public/${req?.file?.filename}`;

  try {
    let payload = await CareerModel.create(datum);
    console.log(payload, "Payload");
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
