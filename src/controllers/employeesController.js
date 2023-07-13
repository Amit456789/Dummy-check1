const path = require('path')
const fs = require('fs')
const asyncHandler = require('../middleware/async')
const { ErrorResponse } = require('../utils/errorResponse')
const Category = require('../models/emplyee')


// @desc    Get employees
// @route   GET /api/v1/employees
exports.getEmployees = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single employees
// @route   GET /api/v1/employees/:id
exports.getEmployee = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req?.params.id)

  if (!category) {
    return next(
      new ErrorResponse(`No category with that id of ${req?.params.id}`)
    )
  }

  res.status(200).json({ success: true, data: category })
})

// @desc    Create employees
// @route   POST /api/v1/employees/
exports.createEmployee = asyncHandler(async (req, res, next) => {
  let category = await Category.findOne({ EmployeeId: req.body.EmployeeId })

  if (category) {
    return next(new ErrorResponse('Employee already exists', 400))
  }

  if (!req.files || !req.files.photo) {
    // return next(new ErrorResponse(`Please upload a photo`, 404))
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

// @desc    Update employees
// @route   PUT /api/v1/employees/:id
exports.updateEmployee = asyncHandler(async (req, res, next) => {
  const address = await Category.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  })

  if (!address) {
    return next(new ErrorResponse(`No employee with id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: address })
})


// // @desc    Delete employees
// // @route   DELETE /api/v1/employees/:id
// exports.deleteEmployee = asyncHandler(async (req, res, next) => {
//   // const category = await Category.findByIdAndDelete(req.params.id)
//   let category = await Category.findById(req.params.id)

//   if (!category) {
//     return next(
//       new ErrorResponse(`No category with id of ${req.params.id}`, 404)
//     )
//   }

//   if (category && category.photo !== 'no-photo.jpg') {
//     fs.unlink(
//       `${process.env.FILE_UPLOAD_PATH}/${category.photo}`,
//       async (err) => {
//         await category.remove()
//         if (err) {
//           return next(
//             new ErrorResponse(
//               `Something went wrong, couldn't delete category photo`,
//               500
//             )
//           )
//         }

//         return res.status(200).json({ success: true, category })
//       }
//     )
//   } else {
//     await category.remove()
//     return res.status(200).json({ success: true, category })
//   }
// })

// @desc    Delete employees
// @route   DELETE /api/v1/employees/:id
exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  const existingCategory = await Category.findById(req?.params?.id)
  if (!existingCategory) {

    return res.status(500).json({ status: "FAILURE", msg: `No Employee with id of ${req.params.id}` })
  }



  const category = await Category.findOneAndDelete(
    { _id: req.params.id })






  if (existingCategory && existingCategory.photo !== 'no-photo.jpg') {

    // fs.unlink(`${process.env.FILE_UPLOAD_PATH}/${existingCategory.photo}`, (err) => {
    //   if (err) {
    //     // return next(
    //     //   new ErrorResponse(
    //     //     `Something went wrong, couldn't delete category photo`,
    //     //     500
    //     //   )
    //     // )
    //     return res.status(500).json({ status: "FAILURE", msg: "Something went wrong, couldn't delete category photo" })
    //   }
    //   return res.status(200).json({ success: true, existingCategory })
    // })
  } else {
    res.status(200).json({ success: true, existingCategory })
  }


})

// // @desc    Upload photo for category
// // @route   PUT /api/v1/categories/:id/photo
// // @access  Private Admin
// exports.categoryPhotoUpload = asyncHandler(async (req, res, next) => {
//   const category = await Category.findById(req.params.id)
//   if (!category) {
//     return next(
//       new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
//     )
//   }

//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 404))
//   }

//   const photo = req.files.photo

//   if (!photo.mimetype.startsWith('image')) {
//     return next(new ErrorResponse(`Please upload an image photo`, 404))
//   }

//   if (photo.size > process.env.MAX_FILE_UPLO
//       new ErrorResponse(
//         `Please upload an image less than ${
//           process.env.MAX_FILE_UPLOAD / 1000 / 1000
//         }mb`,
//         404
//       )
//     )
//   }

//   photo.name = `photo-${category._id}${path.parse(photo.name).ext}`

//   photo.mv(`${process.env.FILE_UPLOAD_PATH}/${photo.name}`, async (err) => {
//     if (err) {
//       console.error(err)
//       return next(new ErrorResponse(`Problem with photo upload`, 500))
//     }

//     await Category.findByIdAndUpdate(req.params.id, { photo: photo.name })

//     res.status(200).json({ success: true, data: photo.name })
//   })
// })
