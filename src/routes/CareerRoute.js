import express from "express";
const router = express.Router();

import {
  CareerCreate,
  // CareerDetails,
  // saveCareerDetails,
} from "../controllers/careerController.js";

import { validateMimeType } from "../utils/multerUpload.js";
// Post route to post a new data from user including cv
router.post("/career", validateMimeType, CareerCreate);

export { router };
