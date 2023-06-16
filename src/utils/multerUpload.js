//This comp is to check abut the file type of a uploaded file and proceed it only if it is a pdf

// import { upload } from "./multerPdfUpload.js";

const upload = require("./multerPdfUpload.js").upload;

const uploadSingleImage = upload.single("cv");
function validateMimeType(req, res, next) {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    next();
  });
}
module.exports = {
  validateMimeType: validateMimeType,
};

