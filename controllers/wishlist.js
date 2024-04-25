const User = require('../models/user')

const getWishlistProducts = async (req, res) => {
  const userId = req._id
  try {
    let user = await User.findById(userId).populate('cart.product')
    console.log('User Wishlist: ', user.wishlist)
    res.status(200).json(user.cart)
  } catch (err) {
    console.error('Error getting user wishlist: ', err)
  }
}

const addWishlistProduct = async (req, res) => {
  const { productId } = req.body
  const userId = req._id
  try {
    let user = await User.findById(userId)
    if (user.wishlist.some((item) => item.product.equals(productId))) {
      return res.status(400).json({ message: 'Product ALREADY in wishlist' })
    }
    user.wishlist.push({ product: productId })
    await user.save()
    console.log('User wishlist: ', user.wishlist)
    res.status(201).json(user.wishlist)
  } catch (err) {
    console.error('Error adding product into user wishlist:\n', err)
    res.status(500).json({ message: 'Server error' })
  }
}

const updateWishlistProduct = async (req, res) => {
  const { productId, quantity } = req.body
  const userId = req._id
  try {
    let user = await User.findById(userId)
    const itemIndex = user.wishlist.findIndex((item) =>
      item.product.equals(productId)
    )
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' })
    }
    user.wishlist[itemIndex].quantity = req.body.quantity
    await user.save()
    res.status(200).json(user.wishlist[itemIndex])
  } catch (err) {
    console.error('Error updating product in user wishlist: ', err)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteWishlistProduct = async (req, res) => {
  const { productId } = req.body
  const userId = req._id
  try {
    let user = await User.findById(userId)
    const itemIndex = user.wishlist.findIndex((item) => {
      item.product.equals(productId)
    })
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' })
    }
    user.wishlist.splice(itemIndex, 1)
    await user.save()
    res.status(200).json(user.wishlist)
  } catch (err) {
    console.error('Error deleting product from user wishlist: ', err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getWishlistProducts,
  addWishlistProduct,
  updateWishlistProduct,
  deleteWishlistProduct,
}
