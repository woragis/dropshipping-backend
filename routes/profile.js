const router = require('express').Router()
const {
  getProfile,
  updateUsername,
  updateEmail,
  updatePassword,
} = require('../controllers/profile')
const { authenticateJwt } = require('../middlewares/auth')

router.route('/').get(authenticateJwt, getProfile)
router.route('/update/username').put(authenticateJwt, updateUsername)
router.route('/update/email').put(authenticateJwt, updateEmail)
router.route('/update/password').put(authenticateJwt, updatePassword)

module.exports = router
