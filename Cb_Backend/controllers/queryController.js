const ai = require('../services/geminiClient')
exports.getAnswer = async (req,res,next)=>{
  try{
    const {message} = req.body;
    if(!message || !message.trim()){
      return res.status(400).json({
        error:"Message is required",
      })
    }
    console.time("Gemini API Time");
    const response = await ai.models.generateContent({
      model:"gemini-3.5-flash-lite",
      contents:message,
    })
     console.timeEnd("Gemini API Time");
    console.log("This is the response from Gemini: ",response.text)
    res.json({
      reply:response.text,
    })
  }
   catch (error) {
    console.error("Gemini API error:", error);

    res.status(500).json({
      error: "Failed to generate AI response",
    });
  }
}