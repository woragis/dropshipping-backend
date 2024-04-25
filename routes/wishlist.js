const router = require('express').Router()
const { authenticateJwt } = require('../middlewares/auth')
const {
  getWishlist,
  addWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
} = require('../controllers/wishlist')

router
  .route('/')
  .get(authenticateJwt, getWishlist)
  .post(addWishlistItem)
  .put(updateWishlistItem)
  .patch(updateWishlistItem)
  .delete(deleteWishlistItem)

module.exports = router
