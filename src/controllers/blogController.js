const { json } = require("body-parser")
const project = require("../models/blog")






// @desc    Post projects
// @route   GET /api/v1/postProjects
const uploadBlogs = async (req, res) => {
    try {


        const { files } = req
        const propertyGallery = []
        const pictures = files.forEach((file) => {
            propertyGallery.push(file?.path)
        })





        const payload = {
            topic: req?.body?.topic,
            writer: req?.body?.writer, content: req?.body?.content
        }

        const uploadProjects = new project({ ...payload, propertyGallery })
        const savedUploadProjects = await uploadProjects.save()
        res.status(200).json({ status: "SUCCESS", data: savedUploadProjects })
    }
    catch (err) {
        res.status(400).json({ status: "Failure", error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}` })



    }
}


// @desc    Get projects
// @route   GET /api/v1/getBlogs
const getBlogs = async (req, res) => {
    const filterObject = {}
    let { type } = req.query

    if (type) {
        filterObject.type = type
    }
    try {

        // const Project = await project.find({ type: { $in: [filterObject.type ? type : ""] } })
        const Project = await project.find()


        res.status(200).json({ status: "SUCCESS", Project })
    }
    catch (err) {
        res.status(400).json({ status: "Failure", Error: `${err.message}` || "Internal server error" })
    }
}

// @desc    Update address
// @route   PUT /api/v1/updateBlogs/:id
const updateBlogs = async (req, res) => {

    const existingBlog = await project.findById(req?.params?.id)
    if (!existingBlog) {
        return res.status(400).json({
            status: "FAILURE", msg: "No blog data foud with given id!!"
        })
    }
    const blogs = await project.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    })

    if (!existingBlog) {
        return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

    }

    res.status(200).json({ success: true, data: "Blog updated successfully!!" })
}


const updateProject = async (req, res) => {
    try {
        const { files } = req
        const propertyGallery = []
        const pictures = files.forEach((file) => {
        })

        const Location = JSON.parse(req?.body?.location)
        const payload = {
            buildUpArea: req?.body?.buildUpArea,

            client: req?.body?.client, status: req?.body?.status, location: {
                city: Location.city, state: Location?.state, country: Location?.country
            }, type: [req?.body?.type],
            concept: req?.body?.concept, description: req?.body?.description
        }


        project.findByIdAndUpdate(req.params.id, { ...payload }).then((data) => {

            res.status(200).json({ status: "success ", data })
        }).catch((err) => {
            res.status(400).json({ status: "FAILURE", msg: `${err.message}` })
        })

    }
    catch (err) {
        res.status(400).json({ status: "Failure", error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}` })

    }
}

// @desc    delete projects
// @route   GET /api/v1/deleteProject
const deleteBlogs = async (req, res) => {
    try {
        const existingProject = await project.findById(req.params.id)
        if (!existingProject) {
            return res.status(400).json({ status: "Failure", Error: "No project found with given id!!!" })
        }
        await project.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "Success ", Msg: "Deleted successfully!!"
        })
    } catch (err) {
        res.status(400).json({ status: "Failure", Error: `${err.message}` || "Something went wrong!!" })
    }

}

module.exports = { uploadBlogs, getBlogs, deleteBlogs, updateBlogs }

