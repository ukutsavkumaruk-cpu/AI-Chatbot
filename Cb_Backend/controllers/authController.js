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
      isSignUp:true,
      message:"User Successfully registered"
    })
 }
 catch(error){
  console.log("Error while User signUp");
  return res.status(500).json({
      isSignup:false,
      message: "Internal server error"
    });
 }

}
exports.postLogIn = async(req,res,next)=>{
  try{
    const { email, password } = req.body;
    const user = await user.findOne({ email });
    if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
    }
    const isMatch = await bcrypt.compare(
    password,
    user.password
  );
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }
    const token = jwt.sign(
      {userId:user._id},
      process.env.JWT_SECRET,{expiresIn : "15m"}
    );

    res.status(201).json({
    isLoggedIn:true,
    message: "Login successful",
    token
    });
  }
  catch(error){
    console.log("Error while login : ", error)
    res.status(500).json({
    isSignup:false,
    message: "Internal server error"
    });
  }
}