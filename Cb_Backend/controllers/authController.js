const user = require('../models/user');
const bcrypt = require("bcrypt");

exports.postSignUp = async (req,res,next) =>{
 try{
   const {name,email,password} = req.body;

   if(!name || !email || !password){
    return res.status(400).json({
      message:"All fields are required"
    })
   }
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    if (password.length < 4) {
      return res.status(400).json({
        message: "Password must be at least 4 characters"
      });
    }
    

    const hashedPassword = await bcrypt.hash(password,10)

    const existingUser = await user.findOne({email})

    if(existingUser){
      return res.status(400).json({
        message:"User already Exists."
      })
    }
    const userData = new user({
      name,
      email,
      password:hashedPassword
    })
    await userData.save()
    return res.status(201).json({
      message:"User Successfully registered"
    })
 }
 catch(error){
  console.log("Error while User signUp");
  return res.status(500).json({
      message: "Internal server error"
    });
 }

}