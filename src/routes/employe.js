const express = require('express')
const {
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeesController')

const { upload } = require("../utils/multerMultiple")

const Employee = require('../models/emplyee')
const router = express.Router()


const advancedResults = require('../middleware/advancedResults')
const { protect } = require('../middleware/auth')


router
  .route('/')
  .get(protect, advancedResults(Employee), getEmployees)
  .post(protect, upload.array("images"), createEmployee)


router
  .route('/:id')
  .get(protect, getEmployee)
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee)



module.exports = router
