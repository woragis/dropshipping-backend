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
      const user = await User.findById(payload.sub)
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  })
)

// const authenticateJwt = passport.authenticate('jwt', { session: false })

const authenticateJwt = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) {
    console.log('Authentication unauthorized')
    return res.status(401).json({ message: 'unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.sub)

    if (!user) {
      console.log('Authentication unauthorized')
      return res.status(401).json({ message: 'unauthorized' })
    }
    req.user = user
    console.log('Authentication Authorized')
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: 'unauthorized' })
  }
}

module.exports = { authenticateJwt }
