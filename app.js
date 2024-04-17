const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') })
const mongoose = require('mongoose')
const express = require('express')
const app = express()

// mongoose
const mongoUri =
  process.env.MONGO_URI || 'mongodb://localhost:27017/dropshipping'
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const logger = require('./middlewares/logger')
app.use(logger)

const auth = require('./routes/auth')
app.use('/auth', auth)

const products = require('./routes/products')
app.use('/products', products)

module.exports = app
