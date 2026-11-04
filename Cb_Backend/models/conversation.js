const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title:{
    type:String,
  },
  createdAt:Date
})
module.exports = mongoose.model("Conversation",conversationSchema)
