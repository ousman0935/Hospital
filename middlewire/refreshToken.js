import jwt from 'jsonwebtoken';
import { userModel } from '../model/Model.js';
export const refreshAccessToken=async(req,res)=>{
    console.log("Cookie refreshToken:", req.cookies.refreshToken);
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json({message:"the token is not setted "});
   try {
       const encoded=jwt.verify(refreshToken,process.env.REFRESH_SECRET)
    console.log(encoded);
    
   } catch (error) {
    console.log(error)
    
   }
   
   
    if(!encoded) return res.status(401).json({message:"invalid token dear"})
        const user=userModel.findById(encoded.userId);
    if(user.refreshToken!==refreshToken) return 
    res.status(401).json({message:"invalid token dear"})
const accessToken=jwt.sign({userId:user._id},
                          process.env.ACCESS_SECRET,
                          {expiresIn:"30s"}

                        )
                     res.cookie("refreshToken",refreshToken,{
                        maxAge:30*1000,
                        sameSite:"strict",
                        secure:false,
                        httpOnly:true
                    }) ;   
                    res.status(200).json({message:"success."})

    }   

