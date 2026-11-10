const express = require('express')
const {getConversations,getReqConversation} = require('../controllers/conversationsController')
const ConversationsRouter = express.Router()

ConversationsRouter.get('/',getConversations )
ConversationsRouter.get('/:conv_id',getReqConversation )



module.exports = ConversationsRouter;