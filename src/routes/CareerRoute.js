import express from "express";
const router = express.Router();

// import { ContactValidation } from "../Validations/contactValidation.js";
import { CareerValidation } from "../Validations/CareerValidation.js";
import { CareerCreate } from "../controllers/careerController.js";
// import { errors } from "../ErrorHandler/errors.js";

// router.post("/contact", ContactValidation, ContactCreate);
router.post("/carrer", CareerValidation, CareerCreate);
// router.get("/contact", ContactDetails);

export { router };
