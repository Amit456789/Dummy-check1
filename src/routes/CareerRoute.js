import express from "express";
const router = express.Router();

import {
  CareerCreate,
  // CareerDetails,
  // saveCareerDetails,
 
} from "../controllers/careerController.js";

import multer from "multer";

// const mimeTypes = ["pdf"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const mimeType = file.mimetype;
    const type = mimeType.split("/");

    // cb(null, `${Date.now()}${file.originalname}`);
    cb(null, `${Date.now()}.${type[1]}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("typr", file.mimetype);
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only pdf format is allowed!"));
      // return cb(new Error("Only pdf allowed with upto maximum size of 5 MB"));
    }
  },
});



router.post("/career",upload.single("cv"), CareerCreate);
// router.get("/career", CareerDetails);
// router.post("/career", CareerValidation,upload.single("cv"), CareerCreate);

// router.post("/career", uploadCv);

export { router };
