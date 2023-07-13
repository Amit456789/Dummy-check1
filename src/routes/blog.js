const express = require("express")
const router = express.Router()
const { uploadBlogs, getBlogs, deleteBlogs, updateBlogs } = require("../controllers/blogController")
const { upload } = require("../utils/multerMultiple")
const blog = require('../models/blog');
const { protect } = require("../middleware/auth")

const advancedResults = require('../middleware/advancedResults')


router.route("/").get(protect, getBlogs).post(protect, upload.array("images"), uploadBlogs)
router.route("/:id").delete(protect, deleteBlogs).put(protect, updateBlogs)


module.exports = router
