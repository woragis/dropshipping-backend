const router = require('express').Router()
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products')
const { authenticateJwt } = require('../middlewares/auth')

router.route('/').get(getProducts)
router.route('/new').post(authenticateJwt, createProduct)
router
  .route('/update')
  .put(authenticateJwt, updateProduct)
  .patch(authenticateJwt, updateProduct)
router.route('/delete').delete(authenticateJwt, deleteProduct)

module.exports = router
