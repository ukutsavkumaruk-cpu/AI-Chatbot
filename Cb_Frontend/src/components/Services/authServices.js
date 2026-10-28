export const  postSignUpData = async(name,email,password) =>{
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
    return result;

  }
  catch(error){
    throw new Error(error)
  }
}