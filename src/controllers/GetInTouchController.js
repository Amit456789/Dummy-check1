const { getInTouchValidation } = require("../Validations/GetInTouchValidation");
const { sendEmail } = require("../email");
const { GetInTouchModel } = require("../models/GetInTouchModel");
// @localhosst:4000/api/v1/touch
//Schema is in Model==>Get in Touch
exports.CreateGetInTouch = async (req, res) => {
  const datum = req.body;
  console.log("After the validation",datum)
  let result = getInTouchValidation(datum);
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
  try {
    const { name, email, contact, bhk, budget, area, location,category,subCategory } = req.body;
    let obj = {
      Heading: `A New Project Detail Request`,
      name,
      email,
      contact,
      bhk,
      budget,
      area,
      location,
      category,
      subCategory,
    };
    sendEmail(
      "a0423355@gmail.com",
      "New Project Request",
      "Welcome message content",
      obj, 
    );
    let payload = new GetInTouchModel(req.body);

    await payload.save();
    console.log("This is ciontxcat", req.body);
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
exports.GetInTouchDetails = async (_, res) => {
  try {
    let data = await GetInTouchModel.find();
    res.status(200).json({
      data,
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: error.message,
    });
  }
};
