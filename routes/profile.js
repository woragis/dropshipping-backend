const router = require('express').Router()
const getProfile = require('../controllers/profile')
const { authenticateJwt } = require('../middlewares/auth')

router.route('/').get(authenticateJwt, getProfile)

module.exports = router
