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
  .get(authenticateJwt, getCartlist)
  .post(authenticateJwt, addCartlistItem)
  .put(authenticateJwt, updateCartlistItem)
  .patch(authenticateJwt, updateCartlistItem)
  .delete(authenticateJwt, deleteCartlistItem)

module.exports = router
