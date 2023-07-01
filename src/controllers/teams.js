const path = require('path')
const fs = require('fs')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
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
    return next(
      new ErrorResponse(`No Team with that id of ${req.params.id}`)
    )
  }

  res.status(200).json({ success: true, data: category })
})

// @desc    Create Team
// @route   POST /api/v1/Team/
exports.createTeam = asyncHandler(async (req, res, next) => {
  let category = await Category.findOne({ title: req.body.title })

  if (category) {
    return next(new ErrorResponse('Title already exists', 400))
  }

  if (!req.files || !req.files.photo) {
    category = await Category.create({
      ...req.body
    })

    return res.status(200).json({ success: true, data: category })
  }

  const photo = req.files.photo

  if (!photo.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image photo`, 404))
  }

  if (photo.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD / 1000 / 1000
        }mb`,
        404
      )
    )
  }

  category = await Category.create({
    ...req.body
  })

  photo.name = `photo-${category._id}${path.parse(photo.name).ext}`

  photo.mv(`${process.env.FILE_UPLOAD_PATH}/${photo.name}`, async (err) => {
    if (err) {
      console.error(err)
      await Category.findByIdAndDelete(category._id)
      return next(new ErrorResponse(`Problem with photo upload`, 500))
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
    return next(new ErrorResponse(`No resources with id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: resources })
})


// @desc    Delete Team
// @route   DELETE /api/v1/Team/:id
exports.deleteTeam = asyncHandler(async (req, res, next) => {
  // const category = await Category.findByIdAndDelete(req.params.id)
  let category = await Category.findById(req.params.id)

  if (!category) {
    return next(
      new ErrorResponse(`No category with id of ${req.params.id}`, 404)
    )
  }

  if (category && category.photo !== 'no-photo.jpg') {
    fs.unlink(
      `${process.env.FILE_UPLOAD_PATH}/${category.photo}`,
      async (err) => {
        await category.remove()
        if (err) {
          return next(
            new ErrorResponse(
              `Something went wrong, couldn't delete category photo`,
              500
            )
          )
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
    return next(
      new ErrorResponse(`Team not found with id of ${req.params.id}`, 404)
    )
  }

  if (!req.form.files) {
    return next(new ErrorResponse(`Please upload a file`, 404))
  }

  const photo = req.files.photo

  if (!photo.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image photo`, 404))
  }

  if (photo.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD / 1000 / 1000
        }mb`,
        404
      )
    )
  }

  photo.name = `photo-${category._id}${path.parse(photo.name).ext}`

  photo.mv(`${process.env.FILE_UPLOAD_PATH}/${photo.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with photo upload`, 500))
    }

    await Category.findByIdAndUpdate(req.params.id, { photo: photo.name })

    res.status(200).json({ success: true, data: photo.name })
  })
})
