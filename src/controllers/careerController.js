import { validationResult } from "express-validator";
import { CareerModel } from "../models/careerModel.js";
export const CareerCreate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({
      errors: errors.array(),
    });
  }

  let payload = await CareerModel.create(req.body);
  res.status(200).json({
    data: payload,
  });
};
