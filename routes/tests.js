const router = require('express').Router()
const bodyTest = require('../controllers/tests')

router.route('/').get(bodyTest)

module.exports = router
