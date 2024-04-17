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

module.exports = { getProducts, createProduct }
