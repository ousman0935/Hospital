import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { userModel } from "../model/Model.js"
export const getUsers=async (req,res)=>{
    try {

     const users= await userModel.find();
     if(!users || users.length===0 ) return res.status(404).json({ 
    success: false, 
    message: "No users found" 
      });
     res.status(200).json(users)
 
    } catch (error) {
     res.status(500).json({success:false,
                           message:"dataBase not connected"
     })
    }
}
export const getUser=async (req,res)=>{
    try {

    const id=req.params.id;
    const user= await userModel.findById(id);
    if(!user) return res.status(404).json({
        success:false,
        message:"user not Found"
    });
    res.status(200).json({user})
    } catch (error) {
       console.log(error)
       res.status(500).json({success:false,
       message:"dataBase not connected"
     })
                

    }
   
}
export const edituser=async (req,res)=>{
    if(!req.body || !req.params)
        return res.status(404).json({success:false,
        message:"id parameter Needed"});
    console.log("in edit user route");
    const {id}=req.params;
    if(!id) return res.status(400).json({
        success:false,
        message:"id parameter Needed"
    })
    const {Name,Email,Phone,Roles}=req.body
    console.log(req.body);
    if(!Name || !Email || !Phone || !Roles)  return res.status(400).json({
        success:false,
        message:"All are required fileds dear"
    })
    try {
    const upp= await   userModel.findByIdAndUpdate(id,{Name,Email,Phone,Roles},{ new: true, runValidators: true })
     if(!upp)  return res.status(404).json({
        success:false,
        message:"not updated dear"
    })
         res.status(200).json({ success:true,
        message:"updated"})

    } catch (error) {
     
       console.log(error);
       return res.status(500).json({
            success: false,
            message: "An internal server error occurred during the update."
        });
    }
}
export const deleteUser=async (req,res)=>{
    const {id}=req.params;
    const userDeleted=await userModel.findById(id);
    if(!userDeleted) return res.status(404).json({"message":"the user doesnot exit"});
    const deleted=await userModel.findByIdAndDelete(id)
    if(!deleted)  return res.status(404).json({message:"this is routes in delete"})
        res.status(200).json({message:"Successfull in deleting"})
}
export const addAccount=async (req,res)=>
    { try {
         console.log(req.body);
        const {Name,Email,Phone,password1,password2,Role}=req.body;
     if (!Name || !Email || !Phone || !password1 || !password2)
             return res.status(400).json({"message":"All Fileds are required"})
        if(password1!==password2) 
            return res.status(400).json({"message":" password don't match"})

        const hashedPassword=await bcrypt.hash(password1,10);
        const existUser=await userModel.findOne({Email})
      if(existUser)  return res.status(400).json({"message":"the Email registerd before"})
       const newuser=await userModel.create({Name,Email ,Phone ,Password:hashedPassword,Role})
       if(!newuser) return res.status(500).json({"message":"user not Created "});
       res.status(200).send({"message":"user Created succesfully"});


    } catch (error) {
        console.log(error);
    }
        
       
      }