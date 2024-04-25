const router = require('express').Router()
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products')
const { adminAuthenticateJwt } = require('../middlewares/auth')

router.route('/').post(getProducts)
router.route('/product').post(getProduct)
router.route('/new').post(adminAuthenticateJwt, createProduct)
router.route('/update').put(adminAuthenticateJwt, updateProduct)
router.route('/delete').delete(adminAuthenticateJwt, deleteProduct)

module.exports = router
