const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Assignment = require('../models/HelpDesk')
// const Category = require('../models/Category')

// @desc    Get Help
// @route   GET /api/v1/help
exports.getHelps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single Help
// @route   GET /api/v1/Help/:id
exports.getHelp = asyncHandler(async (req, res, next) => {
  const Help = await Assignment.findById(req.params.id)

  if (!Help) {
    return next(
      new ErrorResponse(`No Help with that id of ${req.params.id}`)
    )
  }

  res.status(200).json({ success: true, data: Help })
})

// @desc    Create Help
// @route   POST /api/v1/Help/
exports.createHelp = asyncHandler(async (req, res, next) => {
  let assignment = await Assignment.findOne({ assignment: req.body.assignment })

  assignment = await Assignment.create({
    ...req.body
  })

  res.status(200).json({ success: true, data: assignment })
})

// @desc    Update Help
// @route   PUT /api/v1/Help/:id
exports.updateHelp = asyncHandler(async (req, res, next) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  })

  if (!assignment) {
    return next(new ErrorResponse(`No Help with id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: assignment })
})

// @desc    Delete Help
// @route   DELETE /api/v1/Help/:id
exports.deleteHelp = asyncHandler(async (req, res, next) => {
  const assignment = await Assignment.findByIdAndDelete(req.params.id)

  if (!assignment) {
    return next(new ErrorResponse(`No Help with id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: assignment })
})
