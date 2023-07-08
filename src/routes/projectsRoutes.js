const express = require("express")
const router = express.Router()
const { uploadProjects, getProject, deleteProject, updateProjectMegha } = require("../controllers/projectController")
const { upload } = require("../utils/multerMultiple")
const Project = require('../models/projectsModel');

const { protect } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults')

router.route("/").get(advancedResults(Project), getProject).post(upload.array("images"), protect, uploadProjects)
router.delete("/:id", protect, deleteProject).put("/:id", upload.array("images"), updateProjectMegha)
// router.put(':/id',upload.array("images"), protect, updateProject)

module.exports = router
