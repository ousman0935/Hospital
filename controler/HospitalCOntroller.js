import { HospitalModel } from "../model/Hospital.js";
export const getHospitals=async (req,res)=>{
try {
   const hospitals= await HospitalModel.find();
   if(!hospitals ||  hospitals.length===0){
    return res.status(400).json({message:"hospital data is empty"});
   }
   res.status(200).json({hospitals:hospitals})

    
} catch (error) {
    return res.status(500).json({message:"interna1 Server error !"})
    console.log(error)
}
}
export const getHospital=async(req,res)=>{
    try {
            const {id}=req.params;
     if(!id){ 
     return res.status(400).json({message:"please provide the parameter"})}
    const hospital=await HospitalModel.findById(id);
    res.status(200).json({message:"successfull",
                          hospital:hospital
    })
} catch (error) {
        return res.status(500).json({message:"interna1 Server error !"})
    console.log(error)
    }
}


export const addHospital=async (req,res)=>{
try {
  console.log("this")
    console.log(req?.body);
    const {Name,Address,Phone,Type,Description,Email,Cover,Logo}=req.body;
    if(!Name || !Phone || !Address || !Type  || !Email){
      return  res.status(400).json({message:"all feilds are requird"
      })
    }
    const emailexist=await HospitalModel.findOne({Email})
    if(emailexist){
      console.log(" this email is registerd Before!!  ")
      return res.status(404).json({
        success:false,
        error:"this email is registerd Before!!"
      })
    }
    const phoneExist=await HospitalModel.findOne({Phone})
        if(phoneExist){
                 error:"this phone is registerd Before!!"
      return res.status(404).json({
        success:false,
        error:"this Phone is Used Before!!"
      })
    }
    const newCreated={
       Name:Name,
        Email:Email,
        Address:Address,
        Phone:Phone,
        Type:Type,
    }
    if(Description) newCreated.Description=Description
    if(Logo) newCreated.Logo=Logo
    if(Cover) newCreated.Cover=Cover

    const newHospital=await HospitalModel.create(newCreated)
    return res.status(201).json({
      message: "Hospital added successfully",
      hospital: newHospital,
})
    
} catch (error) {
    console.log(error)
    return res.status(500).json({message:`interna1 Server error ! ${error}`})
    
}
}

export const deleteHospital=async (req,res)=>{
   try {
    
     const {id}=req.params;
    if(!id){
      return  res.status(404).json({message:"Id Parameter Needed!"})
    }
    const deleted=await HospitalModel.findByIdAndDelete(id)
        if (!deleted) {
      return res.status(404).json({ message: "Hospital not found or already deleted!" });
    }

      return res.status(200).json({
      message: "Deleted Successfully!!",
      hospital: deleted,
})
   } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });

   }

}
export const UpdateHospital=async (req,res)=>
  {
    try {
       const {id}=req.params || {};
   if(!id){
      return  res.status(404).json({message:"Id Parameter Needed!"})
    }
    const {Name,Address,Description,Email,Phone,Type}=req.body || {};
    if(!Name || !Address || !Phone || !Type || !Description ){
        return  res.status(404).json({message:"All Fields are Required!"})
    }

    const UpdatedHospital=await HospitalModel.findByIdAndUpdate(id,{
        Name:Name,
        Address:Address,
        Email:Email,
        Phone:Phone,
        Type:Type,
       Description:Description})
    if(!UpdateHospital){res.status(500).json({message:"the hospital is deleted before or doesnot exist !"})}
        return res.status(200).json({
      message: "Updated Successfully!!",
      hospital: UpdateHospital,
})
    } catch (error) {
      console.log(error)
            return  res.status(500).json({message:"internal server seror"})
    }
   
}