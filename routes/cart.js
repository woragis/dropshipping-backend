const router = require('express').Router()
const { authenticateJwt } = require('../middlewares/auth')
const {
  getCartlist,
  addCartlistItem,
  updateCartlistItem,
  deleteCartlistItem,
} = require('../controllers/cart')

router
  .route('/')
  .get(getCartlist)
  .post(addCartlistItem)
  .put(updateCartlistItem)
  .patch(updateCartlistItem)
  .delete(deleteCartlistItem)

module.exports = router
