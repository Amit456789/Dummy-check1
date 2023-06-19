// import multer from "multer";

// const mimeTypes = ["pdf"];
//This is the main multer logic refer to official doc and code snips @ stackoverflow and on google.
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const mimeType = file?.mimetype;
    const type = mimeType?.length > 0 && mimeType?.split("/");

    // cb(null, `${Date.now()}${file.originalname}`);
    cb(
      null,
      Array.isArray(type) && type?.length > 0 && `${Date.now()}.${type[1]}`
    );
  },
});
exports.upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("typr", file.mimetype);
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only pdf format is allowed!"));
    }
  },
});
