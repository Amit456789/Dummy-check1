const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/auth")
const { uploadProjects, getProject, deleteProject, updateProjectMegha, getSingleProject } = require("../controllers/projectController")
const { upload } = require("../utils/multerMultiple")
const Project = require('../models/projectsModel');



const advancedResults = require('../middleware/advancedResults')

// router.route("/").get(protect, advancedResults(Project), getProject).post(protect, upload.array("images"), uploadProjects)
router.route("/").get(protect, getProject).post(protect, upload.array("images"), uploadProjects)
router.route("/:id").delete(protect, deleteProject).put(protect, upload.array("images"), updateProjectMegha).get(protect, getSingleProject)
// router.put(':/id',upload.array("images"), protect, updateProject)


module.exports = router
