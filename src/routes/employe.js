const express = require('express')
const {
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeesController')

const Employee = require('../models/contactModel')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')


router
  .route('/')
  .get(advancedResults(Employee), getEmployees)
  .post(createEmployee)

router
  .route('/:id')
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee)



module.exports = router
