const jwt = require("jsonwebtoken");
const Conversations = require('../models/conversation');
const Message = require('../models/message')

exports.getReqConversation = async(req,res,next) =>{
  try{
    const conv_id = req.params.conv_id;
    const Messages = await Message.find({conversationId:conv_id}).sort({ updatedAt: 1 })
     res.status(200).json({
      success: true,
      Message:Messages
    });
  }
  catch(error){
    console.log("Error aa gaya particular conversation fetch me.")
    res.status(500).json({
      success: false,
      message: error})
  }
}
exports.getConversations = async(req,res,next)=>{
  try{
    const token = req.cookies.token;
    const {userId} = jwt.verify(token,process.env.JWT_SECRET)
    const conversations =  await Conversations.find({ userId }).sort({ updatedAt: -1 });
     res.status(200).json({
      success: true,
      conversations
    });
  }
  catch(error){
    console.log("Error aa gaya conversation fetch me.")
    res.status(500).json({
      success: false,
      message: error.message})
  }
}