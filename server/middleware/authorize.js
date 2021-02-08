const {Wishlist} = require('../models')

function authorize(req, res, next) {
  let UserId = req.decoded.id
  Wishlist.findOne({
    where: {UserId}
  })
  .then(user => {
    next()
  })
  .catch(err => {
    console.log(err)
    next(err)
  })
}
module.exports = authorize
