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
  console.log('Callidng create product function')
  const { title, description } = req.body
  const price = Number(req.body.price)
  console.log(req.body)
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
  const { _id, title, description } = req.body
  const price = Number(req.body.price)
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

module.exports = { getProducts, createProduct, updateProduct, deleteProduct }
