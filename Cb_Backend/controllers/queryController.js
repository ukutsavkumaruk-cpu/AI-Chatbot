const ai = require('../services/geminiClient')
const Message = require('../models/message')
exports.getAnswer = async (req,res,next)=>{
  try{
    const {message} = req.body;
    
    if(!message || !message.trim()){
      return res.status(400).json({
        error:"Message is required",
      })
    }
    try{
      const userMessage = new Message({
      role:"user",
      contents:message,
      })
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
    try{
      const agentMessage = new Message({
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
    res.status(200).json({
      success:true,
      reply:response.text,
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