const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  role:String,
  contents:String
})
module.exports = mongoose.model("Message",MessageSchema)