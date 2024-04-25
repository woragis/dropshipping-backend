const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getProfile = async (req, res) => {
  const userId = req._id
  const user = await User.find({ _id: userId })
  return res.status(200).json(user)
}

module.exports = getProfile
