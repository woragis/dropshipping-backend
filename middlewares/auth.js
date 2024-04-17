const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/user')

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

const authenticateJwt = passport.authenticate('jwt', { session: false })

module.exports = { authenticateJwt }
