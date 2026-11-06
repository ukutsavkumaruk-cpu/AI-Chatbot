const ai = require('../services/geminiClient')
const Message = require('../models/message');
const Conversation = require('../models/conversation');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');



exports.postChat = async (req,res,next)=>{
  try{
    const {message,conversationId} = req.body;
    
    
    
    // 1. Validate message
    if(!message || !message.trim()){
      return res.status(400).json({
        error:"Message is required",
      })
    }
     
    // 2. Verify JWT
    const token = req.cookies.token;
   
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find existing conversation or create new one
    let conversation;

    if (conversationId) {
        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            return res.status(400).json({
              success: false,
              error: "Invalid conversation ID",
            });
          }

        conversation = await Conversation.findOne({
          _id: conversationId,
          userId: decoded.userId,
        });

        if (!conversation) {
            return res.status(404).json({
              success: false,
              error: "Conversation not found",
            });
          }
        }
    else {
        conversation = await Conversation.create({
          userId: decoded.userId,
          title: message.trim().slice(0, 100),
        });
    }

    // 4. Save user message
    try{
      const userMessage = await Message.create({
      conversationId: conversation._id,
      role: "user",
      contents: message.trim(),
      });
      await userMessage.save();
    }
    catch(err){
      console.log("Error occur during saving User message to DataBase",err);
      res.status(500).json({
        success:false,
        errMessage:"Something went wrong, try again !"
      })
      next(err)
    }
    
    const response = await ai.models.generateContent({
      model:"gemini-3.5-flash-lite",
      contents:message,
    })

    // 6. Save AI response
    try{
      const agentMessage = new Message({
      conversationId:conversationId ? conversationId : conversation._id,
      role:"agent",
      contents: response.text,
      })
      await agentMessage.save();
    }
    catch(err){
      console.log("Error occur during saving Agent message to DataBase",err);
      res.status(500).json({
        success:false,
        errMessage:"Something went wrong, try again !"
      })
      next(err)
    }
     
    console.log("This is the response from Gemini: ",response.text)

    // 7. Send response to frontend
    res.status(200).json({
      success:true,
      reply:response.text,
      conversationId: conversation._id
    })
  }
   catch (error) {
    console.error("Gemini API error:", error);

    res.status(500).json({
      success:false,
      errMessage: "Failed to generate AI response",
      
    });
    next(err)
  }
}
exports.getChat  = async (req,res,next)=>{
  try{
    const response = await Message.find();
    res.status(200).json({
      success:true,
      reply:response
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      error:error
    })
  }
}