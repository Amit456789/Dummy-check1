// import express from "express";
// const router = express.Router();

// import { CareerCreate } from "../controllers/careerController.js";

// import { validateMimeType } from "../utils/multerUpload.js";
// // Post route to post a new data from user including cv
// router.post("/career", validateMimeType, CareerCreate);

// export { router };


//ES5
const express = require("express");
const router = express.Router();

const careerController = require("../controllers/careerController.js");
const multerUploadUtils = require("../utils/multerUpload.js");

const CareerCreate = careerController.CareerCreate;
const validateMimeType = multerUploadUtils.validateMimeType;

// Post route to post a new data from user including cv
router.post("/career", validateMimeType, CareerCreate);

module.exports = {
  router: router
};
