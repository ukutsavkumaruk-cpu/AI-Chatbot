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