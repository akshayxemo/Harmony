const loginController = require('../controllers/loginController')
const signupController = require('../controllers/signupController')

const router = require('express').Router()

router.get("/login",loginController.get)
router.post("/login",loginController.post)

router.get("/signup",signupController.get)
router.post("/signup",signupController.post)

module.exports = router