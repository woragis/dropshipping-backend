const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getProfile = async (req, res) => {
  const authHeader = req.headers['authorization']
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    req.token = token
  }
  const token = req.token
  if (!token) {
    return res.status(401).json({ message: 'unauthorized' })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error('Error decoding token', err)
      return res.status(403).json({ message: 'forbidden' })
    } else {
      const userId = decoded._id
      const user = await User.find({ _id: userId })
      return res.status(200).json(user)
    }
  })
}

module.exports = getProfile
