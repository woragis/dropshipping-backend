const router = require('express').Router()
const { authenticateJwt } = require('../middlewares/auth')
const {
  getWishlistProducts,
  addWishlistProduct,
  deleteWishlistProduct,
} = require('../controllers/wishlist')

router
  .route('/')
  .get(authenticateJwt, getWishlistProducts)
  .post(authenticateJwt, addWishlistProduct)
  .delete(authenticateJwt, deleteWishlistProduct)

module.exports = router
