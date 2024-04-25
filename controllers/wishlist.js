const User = require('../models/user')

const getWishlist = async (req, res) => {
  const usedId = req.user
  try {
    let user = await User.findById(userId).populate('wishlist.product')
    res.status(200).json(user.cart)
  } catch (err) {
    console.error('Error getting user wishlist: ', err)
  }
}

const addWishlistItem = async (req, res) => {
  const usedId = req.user
  try {
    let user = await User.findById(userId).populate('wishlist.product')
    res.status(200).json(user.cart)
  } catch (err) {
    console.error('Error getting user wishlist: ', err)
  }
}

const updateWishlistItem = async (req, res) => {
  const usedId = req.user
  try {
    let user = await User.findById(userId).populate('wishlist.product')
    res.status(200).json(user.cart)
  } catch (err) {
    console.error('Error getting user wishlist: ', err)
  }
}

const deleteWishlistItem = async (req, res) => {
  const usedId = req.user
  try {
    let user = await User.findById(userId).populate('wishlist.product')
    res.status(200).json(user.cart)
  } catch (err) {
    console.error('Error getting user wishlist: ', err)
  }
}
module.exports = {
  getWishlist,
  addWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
}
