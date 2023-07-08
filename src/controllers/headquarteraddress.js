const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Question = require('../models/HeadquarterAddress')

// @desc    Get address
// @route   GET /api/v1/address

exports.getAddresses = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single address
// @route   GET /api/v1/address/:id

exports.getAddress = asyncHandler(async (req, res, next) => {
  const address = await Question.findById(req.params.id)

  if (!address) {
    return next(
      new ErrorResponse(`No address with that id of ${req.params.id}`)
    )
  }

  res.status(200).json({ success: true, data: address })
})

// @desc    Create address
// @route   POST /api/v1/address/

exports.createAddress = asyncHandler(async (req, res, next) => {
  let question = await Question.findOne({ question: req.body.question })


  //   //check if question is repeated or not
  //   if (question) {
  //     return next(new ErrorResponse('Question already exists', 400))
  //   }

  question = await Question.create({
    ...req.body
  })

  res.status(200).json({ success: true, data: question })
})

// @desc    Update address
// @route   PUT /api/v1/address/:id
exports.updateAddress = asyncHandler(async (req, res, next) => {
  const address = await Question.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  })

  if (!address) {
    return next(new ErrorResponse(`No address with id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: address })
})

// @desc    Delete address
// @route   DELETE /api/v1/address/:id
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const address = await Question.findByIdAndDelete(req.params.id)

  if (!address) {
    return next(new ErrorResponse(`No address with id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: address })
})
