import express from "express";
const router = express.Router();

import { CareerCreate } from "../controllers/careerController.js";

import { validateMimeType } from "../utils/multerUpload.js";
import { CareerValidation } from "../Validations/CareerValidation.js";
// Post route to post a new data from user including cv
router.post("/career", validateMimeType, CareerCreate);

export { router };
