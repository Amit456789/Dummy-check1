const express = require('express')
const {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  TeamPhotoUpload
} = require('../controllers/teams')
const { protect } = require("../middleware/auth")

const Teams = require("../models/TeamMember")

const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults')

router
  .route('/')
  .get(protect, advancedResults(Teams), getTeams)
  .post(protect, createTeam)

router
  .route('/:id')
  .get(protect, getTeam)
  .put(protect, updateTeam)
  .delete(protect, deleteTeam)

router.route('/:id/photo').put(TeamPhotoUpload)

module.exports = router
