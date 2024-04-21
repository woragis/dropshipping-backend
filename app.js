const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') })
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./middlewares/logger')
const bodyTest = require('./routes/tests')
const auth = require('./routes/auth')
const products = require('./routes/products')
const profile = require('./routes/profile')

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

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(logger)
app.use('/', bodyTest)
app.use('/auth', auth)
app.use('/products', products)
app.use('/profile', profile)

module.exports = app
