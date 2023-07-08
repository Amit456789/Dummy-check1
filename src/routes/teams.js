const express = require('express')
const {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  TeamPhotoUpload
} = require('../controllers/teams')

const Teams = require("../models/TeamMember")

const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults')

router
  .route('/')
  .get(advancedResults(Teams), getTeams)
  .post(createTeam)

router
  .route('/:id')
  .get(getTeam)
  .put(updateTeam)
  .delete(deleteTeam)

router.route('/:id/photo').put(TeamPhotoUpload)

module.exports = router
