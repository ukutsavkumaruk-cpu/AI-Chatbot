
export const sendQuery = async(message) =>{
  try{const response = await fetch("http://localhost:3010/api/chat",{
    method:"POST",
    headers:{
      "content-Type": "application/json"
    },
    body: JSON.stringify({
      message:message
    })
  })
  const result = await response.json()
  return result}
  catch(err){
    console.log("Error occur while sending query or getting result int Frontend service.js :",err)
  }
}
export const getChat = async ()=>{
  
try{
  
  const response = await fetch("http://localhost:3010/api/chat",{
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