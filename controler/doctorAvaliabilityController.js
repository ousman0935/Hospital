import DoctorAvaliabilityModel from "../model/DoctorAvaliability.js";

export const avaliabilityController=async (req,res)=>{
try
 {   const {doctorId}=req?.params;
    if(!doctorId){
        return res.status(404).json({error:"the user session must be started!! "})
    }
const {weeklySchedule,slotDuration}=req?.body;   
if(!weeklySchedule )
{
    return res.status(400).json({error:"fill all requirment!! "});
   

}

const invalidDay=weeklySchedule.some(day=>day.isAvailable &&
     (!day.endTime || !day.startTime ))
   if(invalidDay)  
     { return res.status(400).json({error:"fill all requirment!! "});

     }
 let avalabilityCollection={weeklySchedule,doctorId,...(slotDuration && { slotDuration })
}



const NewAvalability= await DoctorAvaliabilityModel.create(
    avalabilityCollection)

 if(!NewAvalability){
    return res.status(400).json({error:"the avalablity not saved! "})
 }

 res.status(200).json({ message:"Saved SuccessFullly!!",
    success:true,
    data:NewAvalability,
   
 })
}
catch(error)
{
    
console.log(error)
return res.status(500).json({error:"internal server error!!"});

}

}
export const deleteAvaliablityController=async (req,res)=>{
try {
    
    const {id}=req.params;
    if(!id){
    return res.status(400).json({Error:"Docter Not Exist!!"})

    }
   
 const deletedAvaliablity=await DoctorAvaliabilityModel.findByIdAndDelete(id)
if(!deletedAvaliablity){
        return    res.status(400).json({Error:"the Docter is Not deleted!!"})

}         res.status(200).json({Message:"Successfulll!"})}
catch (error) {
    res.status(500).json({error:error})
} 
}
export const docterAvalabilitylists=async (req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(404).json({Message:"the  user setion is not started"})
        }

        const avalabilitys= await DoctorAvaliabilityModel.find({doctorId:id})
    if(!avalabilitys){
  return res.status(400).json({Message:"not successfull!!"})


    }
      res.status(200).json({Message:"successfull!!",avalabilitys:avalabilitys})

    } catch (error) {
        return res.status(500).json({Message:"internal Server error "})
  
    }
}