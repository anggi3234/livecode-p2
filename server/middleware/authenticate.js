const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
  try {
    let token = req.headers.access_key
    let decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded
    next()
  }
  catch (err) {
    next(err)
  }
}

module.exports = authenticate;
