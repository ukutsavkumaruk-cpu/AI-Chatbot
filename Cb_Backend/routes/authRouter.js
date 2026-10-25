const express = require('express')
const {postUserAuth} = require('../controllers')
const authRouter = express.Router()

authRouter.get('/',)
authRouter.post('/',postUserAuth)

module.exports = authRouter;