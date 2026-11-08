const express = require('express')
const {postSignUp,postLogIn,checkAuth,postLogout } = require('../controllers/authController')
const authRouter = express.Router()

authRouter.get('/check',checkAuth )
authRouter.post('/login',postLogIn)
authRouter.post('/signUp',postSignUp)
authRouter.post('/logout',postLogout)

module.exports = authRouter;