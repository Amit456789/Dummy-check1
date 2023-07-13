

//ES5
const express = require("express");
const router = express.Router();

const careerController = require("../controllers/careerController.js");
const multerUploadUtils = require("../utils/multerUpload.js");

const CareerCreate = careerController.CareerCreate;
const validateMimeType = multerUploadUtils.validateMimeType;
const { protect } = require("../middleware/auth.js")


// Post route to post a new data from user including cv
router.post("/", protect, validateMimeType, CareerCreate);
router.get("/", protect, careerController.CareerDetails);

module.exports = router
