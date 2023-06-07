import express from "express";
const router = express.Router();

import { ContactCreate, ContactDetails } from "../routes/contactRoutes.js";
import { ContactValidation } from "../Validations/contactValidation.js";
// import { errors } from "../ErrorHandler/errors.js";

router.post("/contact", ContactValidation, ContactCreate);
router.get("/contact", ContactDetails);

export { router };
