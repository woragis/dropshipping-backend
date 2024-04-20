const { generateToken, verifyToken } = require('../jwt')
const User = require('../models/user')
const { genSalt, getRounds, hash, compare } = require('bcrypt')

const encryptPassword = async (password) => {
  const rounds = await getRounds('ass')
  const salt = await genSalt(rounds)
  const hashedPassword = await hash(password, salt)
  return hashedPassword
}

const decryptPassword = async (originalPassword, encryptedPassword) => {
  const equal = await compare(
    originalPassword,
    encryptPassword,
    (err, same) => {
      if (same) {
        return true
      } else {
        return false
      }
    }
  )
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' })
    }
    const rightPassword = decryptPassword(user.password, password)
    if (!rightPassword) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = generateToken({ sub: user._id })
    return res.json({ token })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

const register = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }
    const encryptedPassword = encryptPassword(password)
    const newUser = new User({ email, encryptedPassword })
    await newUser.save()

    const token = generateToken({ sub: newUser._id })
    return res.status(201).json({ token })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { login, register }
