const express = require("express")
const router = express.Router()
const { uploadProjects, getProject, deleteProject } = require("../controllers/projectController")
const { upload } = require("../utils/multerMultiple")

router.post("/postProjects", upload.array("images"), uploadProjects)
router.get("/getProjects", getProject)
router.delete("/deleteProjects/:id", deleteProject)

module.exports = router
