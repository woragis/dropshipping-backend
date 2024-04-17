const logger = (req, res, next) => {
  console.log(req.method, req.baseUrl, req.url, req.body)
  next()
}

module.exports = logger
