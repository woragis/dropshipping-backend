const { generateToken, verifyToken } = require('../jwt')
const User = require('../models/user')
const { genSalt, getRounds, hash, compare } = require('bcrypt')
const { transporter } = require('./emails')

const encryptPassword = async (password) => {
  const salt = await genSalt(13)
  const hashedPassword = await hash(password, salt)
  return hashedPassword
}

const decryptPassword = async (originalPassword, encryptedPassword) => {
  const equal = await compare(
    originalPassword,
    encryptPassword,
    (err, same) => {
      if (same) return true
      else return false
    }
  )
}

const isValidPassword = async (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

const emailOptions = {
  from: 'jezreel.veloso@gmail.com',
  to: 'jezreelgamer1@gmail.com',
  subject: 'Account confirmation',
  text: 'hi bitch',
  html: '<strong>Sit</strong><em>hi</em>',
}

const confirmEmail = async () => {
  try {
    await transporter.send(emailOptions, (err, info) => {
      console.log(info)
    })
  } catch (err) {
    console.log('error sending confirmation email')
    console.log(err)
  }
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
    if (!isValidPassword(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      })
    }
    const encryptedPassword = await encryptPassword(password)

    const newUser = new User({ email: email, password: encryptedPassword })
    await newUser.save()

    const token = generateToken({ sub: newUser._id })
    await confirmEmail()
    return res.status(201).json({ token })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { login, register }
