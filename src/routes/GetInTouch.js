
const express = require("express");
const { CreateGetInTouch } = require("../controllers/GetInTouchController");
const router = express.Router();


router.post("/", CreateGetInTouch);
// router.get("/touch", ContactDetails);

module.exports = router

