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
  .get(advancedResults(Address) , getAddresses)
  .post(protect , createAddress)

router
  .route('/:id')
  .get(getAddress)
  .put(protect , updateAddress)
  .delete(protect ,deleteAddress)



module.exports = router
