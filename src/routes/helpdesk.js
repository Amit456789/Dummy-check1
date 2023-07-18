const express = require('express')

const {
  getHelps,
  getHelp,
  createHelp,
  updateHelp,
  deleteHelp
} = require('../controllers/helpdesk')
const { protect } = require("../middleware/auth")

const Assignment = require('../models/HelpDesk')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')


router
  .route('/')
  .get(protect, advancedResults(Assignment), getHelps)
  .post(protect, createHelp)

router
  .route('/:id')
  .get(protect, getHelp)
  .put(protect, updateHelp)
  .delete(protect, deleteHelp)

module.exports = router
