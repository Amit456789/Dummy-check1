const express = require('express')
const {
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeesController')
const { protect } = require("../middleware/auth")

const Employee = require('../models/emplyee')
const router = express.Router()


const advancedResults = require('../middleware/advancedResults')


router
  .route('/')
  .get(protect, advancedResults(Employee), getEmployees)
  .post(protect, createEmployee)

router
  .route('/:id')
  .get(protect, getEmployee)
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee)



module.exports = router
