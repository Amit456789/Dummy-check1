const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')

const User = require('../models/User')

exports.protect = asyncHandler(async (req, res, next) => {
  let token
  const { cookie } = req.header
  console.log(cookie, "vfhfguj")
  console.log(req.cookies.token)
  // for Headers(authorization)

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   token = req.headers.authorization.split(' ')[1]
  // }
  // Set token from cookie



  if (req.cookies.token) {
    token = req?.cookies?.token

  }
  res.status(400).json({ status: "FAILURE", msg: "Internal server error" })
  if (!token) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error" })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded, "kjkj")
    req.user = await User.findById(decoded.id)

    next()
  } catch (err) {
    return res.status(400).json({ status: "FAILURE", msg: "Internal server error" })
  }
})

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(400).json({ status: "FAILURE", msg: "Internal server error" })
    }
    next()
  }
}
