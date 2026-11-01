const express = require('express')
const {postSignUp,postLogIn,checkAuth } = require('../controllers/authController')
const authRouter = express.Router()

authRouter.get('/check',checkAuth )
authRouter.post('/login',postLogIn)
authRouter.post('/signUp',postSignUp)

module.exports = authRouter;