const express = require('express')
const {postSignUp,postLoginIn} = require('../controllers/authController')
const authRouter = express.Router()

authRouter.post('/login',postLoginIn)
authRouter.post('/signUp',postSignUp)

module.exports = authRouter;