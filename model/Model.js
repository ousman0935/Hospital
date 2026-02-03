import   {  mongoose } from 'mongoose'
const user=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Roles:{
    type: String,
    enum: ["User","Admin"],
    default: "User"},
    
    Password:{
        type:String,
        required:true},
    Email:{ 
        type:String,
        required:true,
        unique: true
        },
    Phone:{
        type:String,
         required:true} ,
Location:{
Region: { type: String, required: true, trim: true },
  City: { type: String, trim: true, required: true }, 
  SubCity: { type: String, trim: true, default: null } 


}
},

)
export  const userModel=mongoose.model("user",user);