
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

export const sendQuery = async (message, conversationId, onChunk, onMetadata) => {
  if (typeof onChunk !== "function") {
    throw new TypeError("onChunk must be a function");
  }

  const response = await fetch("http://localhost:3010/api/chat", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, conversationId }),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(result?.error || "Failed to generate response");
  }

  if (!response.body) {
    throw new Error("Streaming is not supported by this browser");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let completedResponse = null;

  const processEvent = (rawEvent) => {
    const data = rawEvent
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");

    if (!data) return;

    const event = JSON.parse(data);
    if (event.type === "metadata") {
      onMetadata?.(event.conversationId);
    } else if (event.type === "chunk") {
      onChunk(event.text);
    } else if (event.type === "done") {
      completedResponse = event;
    } else if (event.type === "error") {
      throw new Error(event.error || "Failed to complete AI response");
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value || new Uint8Array(), { stream: !done });

      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || "";
      events.forEach(processEvent);

      if (done) break;
    }

    if (buffer.trim()) {
      processEvent(buffer);
    }
  } finally {
    reader.releaseLock();
  }

  if (!completedResponse) {
    throw new Error("The AI response stream ended unexpectedly");
  }

  return {
    success: true,
    conversationId: completedResponse.conversationId,
    reply: completedResponse.reply,
  };
};
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
