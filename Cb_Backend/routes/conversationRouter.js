const express = require('express')
const {getConversations } = require('../controllers/conversationsController')
const ConversationsRouter = express.Router()

ConversationsRouter.get('/',getConversations )


module.exports = ConversationsRouter;