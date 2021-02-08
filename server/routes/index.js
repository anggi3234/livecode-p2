const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

// console.log("IN ROUTER REGISTER")
router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authenticate)
router.get('/wishlists', Controller.getWishlist)
router.post('/wishlists', Controller.addWishlist)
router.delete('/wishlists/:id', authorize, Controller.deleteWishlist)

module.exports = router;
