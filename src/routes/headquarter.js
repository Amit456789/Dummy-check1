const express = require('express')
const {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress
} = require('../controllers/headquarteraddress')
const { protect } = require("../middleware/auth")
const Address = require('../models/HeadquarterAddress')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')



router
  .route('/')
  .get(protect, advancedResults(Address), getAddresses)
  .post(protect, createAddress)

router
  .route('/:id')
  .get(protect, getAddress)
  .put(protect, updateAddress)
  .delete(protect, deleteAddress)



module.exports = router
