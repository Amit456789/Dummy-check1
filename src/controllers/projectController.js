const project = require("../models/projectsModel")

const uploadProjects = async (req, res) => {
    try {
        const uploadProjects = new project(req.body)
        const savedUploadProjects = await uploadProjects.save()
        res.status(200).json({ status: "SUCCESS", data: savedUploadProjects })
    }
    catch (err) {
        res.status(400).json({ status: "Failure", error: `${err?.message?.split(":")[2]}` || "Internal server error" })


    }
}
const getProject = async (req, res) => {
    res.send("DONE")
}

module.exports = { uploadProjects, getProject }

