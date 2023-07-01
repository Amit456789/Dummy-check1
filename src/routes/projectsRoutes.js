const express = require("express")
const router = express.Router()
const { uploadProjects, getProject, deleteProject } = require("../controllers/projectController")
const { upload } = require("../utils/multerMultiple")


router.route("/").get(getProject).post(upload.array("images"), uploadProjects)
router.delete("/:id", deleteProject)

module.exports = router
