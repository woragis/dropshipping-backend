const User = require('../models/user')

const getCartlist = async (req, res) => {
  const usedId = req.user
  try {
    let user = await User.findById(userId).populate('cart.product')
    res.status(200).json(user.cart)
  } catch (err) {
    console.error('Error getting user wishlist: ', err)
  }
}

const addCartlistItem = async (req, res) => {
  const usedId = req.user
  try {
    let user = await User.findById(userId).populate('cart.product')
    res.status(200).json(user.cart)
  } catch (err) {
    console.error('Error getting user wishlist: ', err)
  }
}

const updateCartlistItem = async (req, res) => {
  const usedId = req.user
  try {
    let user = await User.findById(userId).populate('cart.product')
    res.status(200).json(user.cart)
  } catch (err) {
    console.error('Error getting user wishlist: ', err)
  }
}

const deleteCartlistItem = async (req, res) => {
  const usedId = req.user
  try {
    let user = await User.findById(userId).populate('cart.product')
    res.status(200).json(user.cart)
  } catch (err) {
    console.error('Error getting user wishlist: ', err)
  }
}

module.exports = {
  getCartlist,
  addCartlistItem,
  updateCartlistItem,
  deleteCartlistItem,
}
