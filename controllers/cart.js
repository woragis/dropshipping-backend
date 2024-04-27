const User = require('../models/user')

const getCartlist = async (req, res) => {
  const userId = req._id
  try {
    let user = await User.findById(userId).populate('cart.product')
    console.log('User cart: ', user.cart)
    res.status(200).json(user.cart)
  } catch (err) {
    console.error('Error getting user cart: ', err)
  }
}

const addCartlistItem = async (req, res) => {
  const { _id, quantity } = req.body
  const userId = req._id
  try {
    let user = await User.findById(userId)
    const existingProduct = user.cart.find((item) => item.product.equals(_id))
    if (existingProduct) {
      existingProduct.quantity += quantity || 1
    } else {
      user.cart.push({ product: _id, quantity: quantity || 1 })
    }
    await user.save()
    console.log('User cart: ', user.cart)
    res.status(201).json(user.cart)
  } catch (err) {
    console.error('Error adding product into user cart:\n', err)
    res.status(500).json({ message: 'Server error' })
  }
}

const updateCartlistItem = async (req, res) => {
  const { productId, quantity } = req.body
  const userId = req._id
  try {
    let user = await User.findById(userId)
    const item = user.cart.find((item) => item._id.equals(productId))
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' })
    }
    item.quantity = quantity
    await user.save()
    res.status(200).json(item)
  } catch (err) {
    console.error('Error updating product in user cart: ', err)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteCartlistItem = async (req, res) => {
  const { productId } = req.body
  const userId = req._id
  try {
    let user = await User.findById(userId)
    const productIndex = user.cart.findIndex((item) => {
      item._id.equals(productId)
    })
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' })
    }
    user.cart.splice(itemIndex, 1)
    await user.save()
    console.log('Deleted user cart item')
    res.status(200).json(user.wishlist)
  } catch (err) {
    console.error('Error deleting product from user cart: ', err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getCartlist,
  addCartlistItem,
  updateCartlistItem,
  deleteCartlistItem,
}
