const express = require("express")
const router = express.Router()
const { uploadBlogs, getBlogs, deleteBlogs, updateBlogs } = require("../controllers/blogController")
const { upload } = require("../utils/multerMultiple")
const blog = require('../models/blog');


const advancedResults = require('../middleware/advancedResults')


router.route("/").get(advancedResults(blog), getBlogs).post(upload.array("images"), uploadBlogs)
router.delete("/:id", deleteBlogs).put("/:id", updateBlogs)
// router.put(':/id',upload.array("images"),  updateblog)

module.exports = router
