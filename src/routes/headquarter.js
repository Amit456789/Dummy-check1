const express = require('express')
const {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress
} = require('../controllers/headquarteraddress')

const Address = require('../models/HeadquarterAddress')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(advancedResults(Address), getAddresses)
  .post(createAddress)

router
  .route('/:id')
  .get(getAddress)
  .put(updateAddress)
  .delete(deleteAddress)



module.exports = router
