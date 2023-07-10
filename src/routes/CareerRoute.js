

//ES5
const express = require("express");
const router = express.Router();

const careerController = require("../controllers/careerController.js");
const multerUploadUtils = require("../utils/multerUpload.js");

const CareerCreate = careerController.CareerCreate;
const validateMimeType = multerUploadUtils.validateMimeType;
console.log("INSDIDE CAREER")
// Post route to post a new data from user including cv
router.post("/", validateMimeType, CareerCreate);
router.get("/", careerController.CareerDetails);

module.exports = router
