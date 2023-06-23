
const express = require("express");
const { CreateGetInTouch } = require("../controllers/GetInTouchController");
const router = express.Router();


router.post("/touch", CreateGetInTouch);
// router.get("/touch", ContactDetails);

module.exports = { router };
