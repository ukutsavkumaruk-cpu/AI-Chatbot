const jwt = require("jsonwebtoken");
const Conversations = require('../models/conversation');

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