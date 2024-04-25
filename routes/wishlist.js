const router = require('express').Router()
const { authenticateJwt } = require('../middlewares/auth')
const {
  getWishlistProducts,
  addWishlistProduct,
  updateWishlistProduct,
  deleteWishlistProduct,
} = require('../controllers/wishlist')

router
  .route('/')
  .get(authenticateJwt, getWishlistProducts)
  .post(authenticateJwt, addWishlistProduct)
  .put(authenticateJwt, updateWishlistProduct)
  .delete(authenticateJwt, deleteWishlistProduct)

module.exports = router
