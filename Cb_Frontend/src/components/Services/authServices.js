export const  postSignUp = async({name,email,password}) =>{
  try{
    const response = await fetch("http://localhost:3010/api/auth/signUp",{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        password:password,
      })
    })
    const result = await response.json();
    console.log(result)
    return result;
  }
  catch(error){
    throw new Error("Not fetched signUp",error)
  }
}
export const  postLogin = async({email,password}) =>{
  try{
    const response = await fetch("http://localhost:3010/api/auth/login",{
      method:"POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password,
      })
    })
    const result = await response.json();
    console.log(result)
    return result;
  }
  catch(error){
    throw new Error("Error while Login : ",error)
  }
}
export const postLogout = async() =>{
  try{
    const response = await fetch("http://localhost:3010/api/auth/logout",{
      method: "POST",
      credentials: "include",
    })
    console.log(response)
    if(response){
      return  response;
    }
  }
  catch(error){
    console.log("Error while logging out.")
  }
}
