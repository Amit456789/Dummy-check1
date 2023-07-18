
const express = require("express");
const { CreateGetInTouch } = require("../controllers/GetInTouchController");
const router = express.Router();
const { protect } = require("../middleware/auth")


router.post("/", protect, CreateGetInTouch);
// router.get("/touch", ContactDetails);

module.exports = router

