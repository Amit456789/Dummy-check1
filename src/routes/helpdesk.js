const express = require('express')

const {
  getHelps,
  getHelp,
  createHelp,
  updateHelp,
  deleteHelp
} = require('../controllers/helpdesk')

const Assignment = require('../models/HelpDesk')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')


router
  .route('/')
  .get(advancedResults(Assignment), getHelps)
  .post(createHelp)

router
  .route('/:id')
  .get(getHelp)
  .put(updateHelp)
  .delete(deleteHelp)

module.exports = router
