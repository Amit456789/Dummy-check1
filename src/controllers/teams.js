const path = require('path')
const fs = require('fs')
const asyncHandler = require('../middleware/async')

const Category = require('../models/TeamMember')

// @desc    Get Team
// @route   GET /api/v1/Team
exports.getTeams = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single Team
// @route   GET /api/v1/Team/:id
exports.getTeam = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

  }

  res.status(200).json({ success: true, data: category })
})

// @desc    Create Team
// @route   POST /api/v1/Team/
exports.createTeam = asyncHandler(async (req, res, next) => {
  let category = await Category.findOne({ title: req.body.title })

  if (category) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

  }

  if (!req.files || !req.files.photo) {
    category = await Category.create({
      ...req.body
    })

    return res.status(200).json({ success: true, data: category })
  }

  const photo = req.files.photo

  if (!photo.mimetype.startsWith('image')) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

  }

  if (photo.size > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

  }

  category = await Category.create({
    ...req.body
  })

  photo.name = `photo-${category._id}${path.parse(photo.name).ext}`

  photo.mv(`${process.env.FILE_UPLOAD_PATH}/${photo.name}`, async (err) => {
    if (err) {
      console.error(err)
      await Category.findByIdAndDelete(category._id)
      return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

    }

    category = await Category.findByIdAndUpdate(
      category._id,
      { photo: photo.name },
      { new: true }
    )

    return res.status(200).json({ success: true, data: category })
  })
})

// @desc    Update Team
// @route   PUT /api/v1/Team/:id
exports.updateTeam = asyncHandler(async (req, res, next) => {
  const resources = await Category.findByIdAndUpdate(req?.params?.id, req.body, {
    runValidators: true,
    new: true
  })

  if (!resources) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

  }

  res.status(200).json({ success: true, data: resources })
})


// @desc    Delete Team
// @route   DELETE /api/v1/Team/:id
exports.deleteTeam = asyncHandler(async (req, res, next) => {
  // const category = await Category.findByIdAndDelete(req.params.id)
  let category = await Category.findById(req.params.id)

  if (!category) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

  }

  if (category && category.photo !== 'no-photo.jpg') {
    fs.unlink(
      `${process.env.FILE_UPLOAD_PATH}/${category.photo}`,
      async (err) => {
        await category.remove()
        if (err) {
          return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

        }

        return res.status(200).json({ success: true, category })
      }
    )
  } else {
    await category.remove()
    return res.status(200).json({ success: true, category })
  }
})

// @desc    Upload photo for category
// @route   PUT /api/v1/categories/:id/photo
exports.TeamPhotoUpload = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

  }

  if (!req.form.files) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

  }

  const photo = req.files.photo

  if (!photo.mimetype.startsWith('image')) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

  }

  if (photo.size > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

  }

  photo.name = `photo-${category._id}${path.parse(photo.name).ext}`

  photo.mv(`${process.env.FILE_UPLOAD_PATH}/${photo.name}`, async (err) => {
    if (err) {
      console.error(err)
      return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

    }

    await Category.findByIdAndUpdate(req.params.id, { photo: photo.name })

    res.status(200).json({ success: true, data: photo.name })
  })
})
