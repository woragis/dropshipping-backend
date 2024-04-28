const { generateToken, verifyToken } = require('../jwt')
const User = require('../models/user')
const { genSalt, getRounds, hash, compare } = require('bcrypt')
const { transporter } = require('./emails')

const encryptPassword = async (password) => {
  const salt = await genSalt(13)
  const hashedPassword = await hash(password, salt)
  return hashedPassword
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
  console.log('login function initiated')
  const { email, password } = req.body
  try {
    console.log('going to find user')
    const user = await User.findOne({ email })
    console.log('finding user')
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' })
      console.log('didnt find user')
    }
    console.log('User Exists')
    const rightPassword = await compare(password, user.password)
    console.log('Password Tested')
    if (!rightPassword) {
      console.log('Password Wrong')
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    console.log('Password Right')
    const token = generateToken({
      _id: user._id,
      admin: user.role === 'user' ? false : true,
    })
    return res.json({ token, username: user.username, role: user.role })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

const register = async (req, res) => {
  console.log('register function initiated')
  const { username, email, password } = req.body
  try {
    console.log('testing if user already exists')
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('user already exists')
      return res.status(400).json({ message: 'Email already registered' })
    }
    console.log('User Not Found')
    console.log('testing password')
    if (!isValidPassword(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      })
    }
    const encryptedPassword = await encryptPassword(password)
    console.log('encrypting password')

    const newUser = new User({
      username: username,
      email: email,
      password: encryptedPassword,
      role: 'admin',
    })
    await newUser.save()
    console.log('user saved')

    const token = generateToken({
      _id: newUser._id,
      admin: newUser.role === 'user' ? false : true,
    })
    // const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res
      .status(201)
      .json({ token, username: newUser.username, admin: newUser.role })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { login, register }
