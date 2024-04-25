const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload._id)
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  })
)

const authenticateJwt = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) {
    console.log("Authentication unauthorized because token doesn't exist")
    return res.status(401).json({ message: 'unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id)
    const _id = decoded._id
    const admin = decoded.admin

    if (!user) {
      console.log("Authentication unauthorized because user doesn't exist")
      return res.status(401).json({ message: 'unauthorized' })
    }
    req.user = user
    req._id = _id
    req.admin = admin
    console.log('Authentication Authorized')
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: 'unauthorized' })
  }
}

const adminAuthenticateJwt = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) {
    console.log("Authentication unauthorized because token doesn't exist")
    return res.status(401).json({ message: 'unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id)
    const _id = decoded._id
    const admin = decoded.admin

    if (!user) {
      console.log("Authentication Unauthorized because user doesn't exist")
      return res.status(401).json({ message: 'Unauthorized' })
    } else if (!admin) {
      console.log('Authentication Unauthorized Because user is not admin')
      return res.status(403).json({ message: 'Forbidden' })
    }
    req._id = _id
    req.user = user
    req.admin = admin
    console.log('Admin Authentication Authorized')
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = { authenticateJwt, adminAuthenticateJwt }
