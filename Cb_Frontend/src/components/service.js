
export const getOneConversation = async (conversationId) =>{
  try{
    
    const response = await fetch(`http://localhost:3010/api/conversations/${conversationId}`,{
    method:"GET",
    credentials: "include",
    headers:{
      "content-Type": "application/json"
    }
  })
  const result = response.json();
  return result;

  }
  catch(error){
    console.log("Error while fetching the Conv Id Messages",error)
    throw error;
  }
}

// SendQuery function ------------>>>>>>>>>>>>>>>
export const sendQuery = async(message,conversationId,onChunk) =>{
  try{
    const response = await fetch("http://localhost:3010/api/chat",{
    method:"POST",
    credentials: "include",
    headers:{
      "content-Type": "application/json"
    },
    body: JSON.stringify({
      message:message,
      conversationId:conversationId
    })
  })
    if (!response.ok) {
      throw new Error("Failed to generate response");
    }

    // Get readable stream
    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let fullResponse = "";

    while (true) {

      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, {
        stream: true
      });

      fullResponse += chunk;

      // Send chunk to callback
      onChunk(chunk);
    }

    // Decode any remaining bytes
    fullResponse += decoder.decode();

    return fullResponse;
}

  catch(err){
    console.log("Error occur while sending query or getting result int Frontend service.js :",err)
  }
}
export const getChat = async (conversationId)=>{
  
try{
  
  const response = await fetch(`http://localhost:3010/api/chat/${conversationId}`,{
    method:"GET",
  })
  const result = await response.json();
  if (!result.success) {
      throw new Error("Failed to fetch chat");
    }
    console.log("Ye hai initially aaai messages: ", result)
    
    return result;
}
catch(err){
  console.log("Error while fetching the chat")
  throw err;
}}
export const getConversations = async () =>{
  try{
    const response = await fetch("http://localhost:3010/api/conversations",{
      method:"GET",
      credentials: "include",
    })
    const conversations = await response.json() 
    return conversations;
  }
  catch(error){
    console.log("Error occur while getting conversations in frontend :",error);
  }
}
