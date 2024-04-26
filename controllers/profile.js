const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getProfile = async (req, res) => {
  const userId = req._id
  const user = await User.find({ _id: userId })
  return res.status(200).json(user)
}

const updateUsername = async (req, res) => {
  const { username } = req.body
  const userId = req._id
  const existingUser = await User.find({ username: username })
  if (existingUser) {
    return res.status(400).json({ message: 'username already taken' })
  }
  const updatedUser = await User.find({ _id: userId })
  updatedUser.username = username
  await updatedUser.save()
  return res.status(200).json(newUser)
}

const updateEmail = async (req, res) => {
  const { email } = req.body
  const userId = req._id
  const existingUser = await User.find({ email: email })
  if (existingUser) {
    return res.status(400).json({ message: 'email already taken' })
  }
  const updatedUser = await User.find({ _id: userId })
  updatedUser.email = email
  await updatedUser.save()
  return res.status(200).json(newUser)
}

const updatePassword = async (req, res) => {
  const { password } = req.body
  const userId = req._id
  const updatedUser = await User.find({ _id: userId })
  updatedUser.password = password
  await updatedUser.save()
  return res.status(200).json({ message: 'password changed successfully' })
}

module.exports = { getProfile, updateUsername, updateEmail, updatePassword }
