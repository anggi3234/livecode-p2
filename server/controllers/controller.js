const {User, Wishlist} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const generateToken = require('../helpers/jwt')

class Controller {
  static register (req, res, next) {
    let newUser = {
      email: req.body.email,
      password: req.body.password
    }
    console.log("IN THE CONTROLLER")
    User.create(newUser)
    .then(user => {
      res.status(201).json({ user})
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static login (req, res, next) {
    let userLogin = {
      email: req.body.email,
      password: req.body.password
    }
    console.log(userLogin)
    User.findOne({
      where: {email: req.body.email}
    })
    .then(user => {
      let compare = comparePass(userLogin.password, user.password)
      if(compare) {
        let access_token = generateToken({id: user.id, email: user.email})
        res.status(200).json({access_token: access_token})
      } else {
        res.status(404).json({msg: "User not found"})
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static getWishlist (req, res, next) {
    let UserId = req.decoded.id
    console.log(UserId, "<<<<<<<<<<<<<<< USER ID")
    Wishlist.findAll({
      where: {
        UserId
      }
    })
    .then(wishlist => {
      res.status(201).json(wishlist)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
  static addWishlist (req, res, next) {
    let newWishlist = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      description: req.body.description,
      UserId: req.decoded.id
    }
    Wishlist.create(newWishlist)
    .then(wish => {
      res.status(201).json(wish)
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteWishlist (req, res, next) {
    let id = +req.params.id
    console.log(User, " <<<< SALDO")
    let UserId = req.decoded.id
    Wishlist.destroy({
      where: {
        id,
        UserId
      },
      returning: true
    })
    .then(wish => {
      res.status(200).json({
        msg: "Successfully delete Wishlist"
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}

module.exports = Controller;
