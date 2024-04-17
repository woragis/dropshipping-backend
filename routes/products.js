const router = require('express').Router()
const { getProducts, createProduct } = require('../controllers/products')
const { authenticateJwt } = require('../middlewares/auth')

router.route('/').get(getProducts).post(authenticateJwt, createProduct)

module.exports = router
