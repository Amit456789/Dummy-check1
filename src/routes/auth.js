const express = require('express')
const router = express.Router()

const {
  getUsers,
  register,
  login,
  logout,
  getMe,
  sendOtp,
  verifyOtp,
  resetPassword,
  updateDetails,
  updatePassword,
  getUsersByName
} = require('../controllers/auth');

const { protect } = require('../middleware/auth');

router.get("/", getUsers)

router.get("/find?", getUsersByName)

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/me', getMe)
router.put('/updatedetails', updateDetails)
router.put('/updatepassword', updatePassword)
//changed forgotpassword route to sendotp and the controller name to sendotp
router.post('/sendotp', sendOtp);
router.post("/verifyotp", verifyOtp);
// router.post('/forgotpassword', forgotPassword)
// router.put('/resetpassword/:resettoken', resetPassword)
router.patch('/resetpassword', resetPassword)


module.exports = router
