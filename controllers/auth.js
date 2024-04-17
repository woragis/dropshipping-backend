const jwt = require('../jwt')
const User = require('../models/user')

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user || user.isValidPassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = jwt.generateToken({ sub: user._id })
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
    const newUser = new User({ email, password })
    await newUser.save()

    const token = jwt.generateToken({ sub: newUser._id })
    return res.status(201).json({ token })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { login, register }
