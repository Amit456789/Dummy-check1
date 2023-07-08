const { json } = require("body-parser")
const project = require("../models/projectsModel")
const { cloudinary } = require("../utils/multerMultiple")





// @desc    Post projects
// @route   GET /api/v1/postProjects
const uploadProjects = async (req, res) => {
    try {

        const { files } = req
        const propertyGallery = []
        const pictures = files.forEach((file) => {
            propertyGallery.push(file?.path)
        })



        const Location = JSON.parse(req?.body?.location)

        const payload = {
            buildUpArea: req?.body?.buildUpArea,
            client: req?.body?.client, status: req?.body?.status, location: {
                city: Location.city, state: Location?.state, country: Location?.country
            }, type: [req?.body?.type],
            concept: req?.body?.concept, description: req?.body?.description
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
// @route   GET /api/v1/getProject
const getProject = async (req, res) => {
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
// @route   PUT /api/v1/address/:id
const updateProjectMegha = async (req, res) => {

    const Location = JSON.parse(req?.body?.location)
    const payload = {
        buildUpArea: req?.body?.buildUpArea,

        client: req?.body?.client, status: req?.body?.status, location: {
            city: Location.city, state: Location?.state, country: Location?.country
        }, type: [req?.body?.type],
        concept: req?.body?.concept, description: req?.body?.description
    }
    const address = await project.findByIdAndUpdate(req.params.id, { ...payload, propertyGallery: req?.file?.path }, {
        runValidators: true,
        new: true
    })

    if (!address) {
        return next(new ErrorResponse(`No project with id of ${req.params.id}`))
    }

    res.status(200).json({ success: true, data: address })
}

// const updateProject = async (req, res) => {
//     console.log(req.body, "jgujh");
//     console.log(req.params.id);
//     try {
//         const { files } = req
//         const propertyGallery = []
//         const pictures = files.forEach((file) => {
//             propertyGallery.push(file?.path)
//         })

//         const Location = JSON.parse(req?.body?.location)
//         const payload = {
//             buildUpArea: req?.body?.buildUpArea,

//             client: req?.body?.client, status: req?.body?.status, location: {
//                 city: Location.city, state: Location?.state, country: Location?.country
//             }, type: [req?.body?.type],
//             concept: req?.body?.concept, description: req?.body?.description
//         }
//         console.log(payload)

//         project.findByIdAndUpdate(req.params.id, { ...payload }).then((data) => {
//             console.log(data)
//             res.status(200).json({ status: "success ", data })
//         }).catch((err) => {
//             console.log(err.message)
//         })

//     }
//     catch (err) {
//         res.status(400).json({ status: "Failure", error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}` })

//     }
// }

// @desc    delete projects
// @route   GET /api/v1/deleteProject
const deleteProject = async (req, res) => {
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

module.exports = { uploadProjects, getProject, deleteProject, updateProjectMegha }

