exports.get404 = (err,req,res,next)=>{
  console.error(err)
  res.status(500).json({success:false,errMessage:'Something went wrong'});
}