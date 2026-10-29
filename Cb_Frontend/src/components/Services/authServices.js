export const  postSignUp = async({name,email,password}) =>{
  try{
    const response = await fetch("http://localhost:3010/api/auth",{
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