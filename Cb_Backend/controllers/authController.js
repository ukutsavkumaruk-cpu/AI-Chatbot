const user = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.getNewAccessToken = async(req,res,next) =>{
  let decoded;
  try{
    const refreshToken = req.cookies.refreshToken;
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const User = await user.findById(decoded.userId).select("-password");
    if(User.refreshToken != refreshToken ) return;
    const token = jwt.sign(
      {userId:User._id},
      process.env.JWT_SECRET,{expiresIn : "30m"}
    );
    res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
    });
    res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 60 * 1000
    }); 
    res.status(201).json({
    isLoggedIn:false,
    message: "New token Assigned",
    });
  }
  catch(error){
      console.log("This is the Error :", error)
      return res.status(401).json({
      isLoggedIn: false,
      message: "REFRESH_TOKEN_EXPIRED",
      User:null
    });
  }
}
exports.checkAuth  = async(req,res,next)=>{
  try{
    const token = req.cookies.token;
    
    if (!token) {
    return res.status(401).json({
      isLoggedIn: false,
      message: "Token not present"
    });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
    } 
    catch (error) {
      console.log("This is the Error :", error)
      return res.status(401).json({
      isLoggedIn: false,
      message: "ACCESS_TOKEN_EXPIRED",
      User:null
    });
    }
    
    const User = await user.findById(decoded.userId).select("-password");
    
    if (!User) {
      return res.status(401).json({
        isLoggedIn: false,
        message: "User not found"
      });
    }
    return res.status(200).json({
      isLoggedIn: true,
      message: "User found",
      User:User
    });
  }
  catch(error){
    console.log("Error while login : ", error)
    return res.status(401).json({
      isLoggedIn: false,
      message: "Invalid or expired token"
    });
  }
}
exports.postLogout = async(req,res,next) =>{
  try{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const User = await user.findById(decoded.userId).select("-password");
    User.refreshToken = null;
    await User.save();
    res.clearCookie("token",{
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
      });
    res.status(200).json({
    success: true,
    message: "Logout successful"
  });
  }
  catch(error){
    res.status(500).json({
    success: false,
    message: "Logout unsuccessfull"
  });
  }
}
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
    const User = await user.findOne({ email });

    if (!User){
    return res.status(401).json({
      message: "Invalid credentials"
      });
    }
    const isMatch = await bcrypt.compare(
    password,
    User.password
    )  
    if (!isMatch) {
        return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign(
      {userId:User._id},
      process.env.JWT_SECRET,{expiresIn : "30m"}
    )
    const refreshToken = jwt.sign(
      {userId:User._id},
      process.env.JWT_REFRESH_SECRET,{expiresIn : "7d"}
    )

    await user.findByIdAndUpdate(User._id,{refreshToken:refreshToken})

    res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 60 * 1000
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

    res.status(201).json({
    isLoggedIn:true,
    message: "Login successful",
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

