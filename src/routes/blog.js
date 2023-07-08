const express = require("express")
const router = express.Router()
const { uploadBlogs, getBlogs , deleteBlogs , updateBlogs } = require("../controllers/blogController")
const { upload } = require("../utils/multerMultiple")
const blog=require('../models/blog');

const { protect } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults')


router.route("/").get(advancedResults(blog),getBlogs).post(upload.array("images"), protect, uploadBlogs)
router.delete("/:id", protect , deleteBlogs).put("/:id",  updateBlogs)
// router.put(':/id',upload.array("images"), protect, updateblog)

module.exports = router
