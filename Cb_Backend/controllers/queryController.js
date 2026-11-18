const ai = require('../services/geminiClient')
const Message = require('../models/message');
const Conversation = require('../models/conversation');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');



exports.postChat = async (req, res) => {
  let streamStarted = false;

  const sendEvent = (event) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  try {
    const { message, conversationId } = req.body;

// Type of message checking----------------->>>>>>>>>
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }
// Token Validation Checking --------------------->>>>>>>>>>>>.
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

// Validating ConversationId ------------------>>>>>>>>>>>>>>>>>>> 
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
    } else {
      conversation = await Conversation.create({
        userId: decoded.userId,
        title: message.trim().slice(0, 100),
      });
    }
    
// Saving User Message to database ------------->>>>>>>>>>>
    await Message.create({
      conversationId: conversation._id,
      role: "user",
      contents: message.trim(),
    });

// Sending response to AI model --------------->>>>>>>>>>>>>
    const response = await ai.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: message.trim(),
      previous_interaction_id: conversation.interactionId || undefined,
      stream: true
    });
    
    res.status(200);
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();
    streamStarted = true;

    sendEvent({ type: "metadata", conversationId: conversation._id });

    let fullResponse = "";
    let latestInteractionId =""
    for await (const event of response) {

      if (event.event_type === "interaction.created") {
          latestInteractionId = event.interaction.id;
      }
      else if (event.event_type === "step.delta" && event.delta?.type === "text") {
        fullResponse += event.delta.text
        sendEvent({ type: "event", text: event.delta.text});
      }
      else if (event.event_type === "interaction.completed") {

        await Conversation.findByIdAndUpdate(
          conversation._id,
          { interactionId: latestInteractionId }
        );

        sendEvent({
          type: "done",
          conversationId: conversation._id,
          reply: fullResponse
        });
        res.end();
      }
    }
// Saving AI message to database ------------>>>>>>>>>
    await Message.create({
      conversationId: conversation._id,
      role: "agent",
      contents: fullResponse,
    });

  } 
  catch (err) {
    console.error("Chat stream error:", err);

    if (streamStarted) {
      if (!res.writableEnded) {
        sendEvent({
          type: "error",
          error: "Failed to complete AI response",
        });
        res.end();
      }
      return;
    }

    res.status(500).json({
      success: false,
      error: "Failed to generate AI response",
    });
  }
};



exports.getChat  = async (req,res,next)=>{
  try{
    const {conversationId} = req.params
    const response = await Message.find({conversationId}).sort({ updatedAt: 1 });
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