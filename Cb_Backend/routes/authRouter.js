const express = require('express')
const {postSignUp} = require('../controllers/authController')
const authRouter = express.Router()

// authRouter.get('/',)
authRouter.post('/',postSignUp)

module.exports = authRouter;