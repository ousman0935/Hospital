import { userModel } from '../model/Model.js'
import { DoctorModel } from '../model/Docter.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const LoginControler =async (req,res) => {
  try {
    let user;
    let role;
    const {Email,Password}=req.body;
    console.log(Email.Password)
    
   if(!Email || !Password) return res.status(404).json({message:"All fields are required"});
   user=await DoctorModel.findOne({Email});
    if(user){
  role = "Docter";
} else {
  user = await userModel.findOne({Email});
  if(user) role = user.Roles || "user";
}
     console.log(user)
    if(!user) return res.status(400).json({message:"the email is not registered register!!!"});
const match=await bcrypt.compare(Password,user.Password);
    if(!match) return res.status(400).json({message:"Invalid credential"});
    const refreshToken=jwt.sign(
                   {id:user._id},          
                    process.env.REFRESH_SECRET,
                    {expiresIn:"7d"})
       const accessToken=jwt.sign(
                    {id:user._id},
                    process.env.ACCESS_SECRET,
                    {expiresIn:"7d"});
          user.refreshToken=refreshToken;
          await user.save();
          res.cookie("refreshToken",refreshToken,{
           httpOnly:true,
           secure:false,
           sameSite:"strict",
            maxAge:7*24*60*60*1000,
          } );
            res.cookie("accessToken",accessToken,{
           httpOnly:true,
           secure:false,
           sameSite:"strict",
            maxAge:30*60*1000,
          } )
     res.status(200).json({message:"successfull",accessToken,user: {
      _id: user._id,  
      Name: user.Name,
      Email: Email,
      Roles: role,
    },});
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:error || "not succesfull"
    })

  }
    
}

export default LoginControler