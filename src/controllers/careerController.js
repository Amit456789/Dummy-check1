// import { validationResult } from "express-validator";
import { CareerModel } from "../models/careerModel.js";
// import multer from "multer";
// import { getFullUrl, multerUploadLimit } from "../utils/index.js";
// import { catchBlockErrorHandler } from "../utils/globalErrorHandler.js";

export const CareerCreate = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(200).json({
  //     errors: errors.array(),
  //   });
  // }
  // let payload = {...data,req.body}
  // console.log("req.body=========================", req.body);
  // console.log("req.files=========================", req.file);
  let { fname } = req.body;
  // fname = fname.trim();
  const uploadeObj = {
    fname,
    cv: `http://localhost:6969/public/${req?.file?.filename}`,
  };
  let payload = await CareerModel.create(uploadeObj);
  console.log(uploadeObj);
  res.status(200).json({
    data: payload,
  });
};
export const CareerDetails = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(200).json({
  //     errors: errors.array(),
  //   });
  // }
  // let payload = {...data,req.body}
  console.log("req.body=========================", req.body);
  console.log("req.files=========================", req.files);
  let payload = await CareerModel.find();
  // console.log(payload)
  res.status(200).json({
    data: payload,
  });
};

// export const uploadCv = async (req, res, next) => {
//   try {
//     // ================================== MULTER CODE => START ==================================
//     const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, "uploads");
//       },

//       filename(req, file, cb) {
//         cb(
//           null,
//           `${Date.now()}-${file?.originalname?.toString()?.replace(/ ./g, "")}`
//         );
//       },
//     });

//     let upload = multer({
//       storage: storage,
//       limits: { fileSize: multerUploadLimit },

//       // Validation code
//       fileFilter: (req, file, cb) => {
//         if (!req?.files?.cv) {
//           return cb(new Error("File is required"));
//         }
//         const fileSize = parseInt(req.headers["content-length"]);
//         if (
//           file.mimetype === "application/pdf" &&
//           fileSize <= multerUploadLimit
//         ) {
//           cb(null, true);
//         } else {
//           return cb(
//             new Error("Only pdf allowed with upto maximum size of 5 MB")
//           );
//         }
//       },
//     });

//     const uploadSinglePdf = upload.single("cv");

//     // ================================== MULTER CODE => FINISH ==================================
//     // next();

//     uploadSinglePdf(req, res, function (err) {
//       if (err) {
//         return res.status(400).send({
//           message:
//             err && err?.message
//               ? err?.message
//               : "Only pdf allowed with upto maximum size of 5 MB",
//         });
//       }

//       // If all Good
//       const file = new CareerModel({
//         name: req?.file?.filename,
//         url: `${getFullUrl(req)}/${req?.file?.path}`,
//         // userId: req.user,
//       });

//       file
//         .save()
//         .then((savedFile) => {
//           res.status(200).json({
//             status: "SUCCESS",
//             msg: "Uploaded pdf saved successfully",
//             document: savedFile,
//             // user: req.email,
//           });
//         })
//         .catch((err) => {
//           catchBlockErrorHandler(err, res);
//         });
//     });
//   } catch (error) {
//     catchBlockErrorHandler(error, res);
//   }
// };

// const saveCareerDetails = (req, res) => {};
