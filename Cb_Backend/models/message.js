const mongoose = require('mongoose')
const conversation = require('./conversation')

const messageSchema = new mongoose.Schema({
  conversationId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  role:String,
  contents:String,
  createdAt:Date
  
})
module.exports = mongoose.model("Message",messageSchema)
