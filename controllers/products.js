const Product = require('../models/products')

const getProducts = async (req, res) => {
  let { skip, limit } = req.body
  if (!skip) {
    let skip = 0
  }
  if (!limit) {
    let limit = 0
  }
  try {
    const products = await Product.find().skip(skip).limit(limit)
    res.status(200).json(products)
  } catch (error) {
    console.log('Error while getting products:\n', error)
    res.status(500).json({ message: 'Error getting products' })
  }
}

const getProduct = async (req, res) => {
  const { _id } = req.body
  try {
    const product = await Product.findById(_id)
    if (!product) {
      return res
        .status(404)
        .json({ message: 'Did not find product with id: ', _id })
    }
    console.log('product: ', product)
    res.status(200).json(product)
  } catch (err) {
    console.log('Error getting product: ' + _id + '\n', err)
    res.status(500).json({ message: 'Server error' })
  }
}

const createProduct = async (req, res) => {
  const { title, price, description } = req.body
  try {
    const newProduct = new Product({ title, price, description })
    await newProduct.save()
    return res.status(201).json(newProduct)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

const updateProduct = async (req, res) => {
  const { _id, title, price, description } = req.body
  try {
    const updatedProduct = Product.updateOne(
      { _id },
      { title, price, description }
    )
    await updatedProduct.save()
    return res.status(200).json(updatedProduct)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

const deleteProduct = async (req, res) => {
  const { _id } = req.body
  try {
    await Product.deleteOne({ _id })
    return res.status(200).json({ message: 'Deleted product: ' + _id })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
