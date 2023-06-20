const express = require("express")
const router = express.Router()
const { uploadProjects, getProject } = require("../controllers/projectController")


router.post("/postProjects", uploadProjects)
router.get("/postProjects", getProject)

module.exports = { router } 