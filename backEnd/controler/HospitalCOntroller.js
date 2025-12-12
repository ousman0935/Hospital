import { HospitalModel } from "../model/Hospital.js";
export const getHospitals=async (req,res)=>{
try {
    console.log("hhhuhu")
   const hospitals= await HospitalModel.find();
   if(!hospitals ||  hospitals.length===0){
    return res.status(400).json({message:"hospital data is empty"});
   }
   res.status(200).json(hospitals)

    
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
    console.log(req.body);
    const {Name,Address,Phone,Type}=req.body;
    if(!Name || !Phone || !Address || !Type){
      return  res.status(400).json({message:"all feilds are requird"
      })
    }
    const newHospital=await HospitalModel.create({
        Name:Name,
        Address:Address,
        Phone:Phone,
        Type:Type
        
    })
    return res.status(201).json({
      message: "Hospital added successfully",
      hospital: newHospital,
})
    
} catch (error) {
    console.log(error)
    return res.status(500).json({message:"interna1 Server error !"})
    
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
    const {Name,Address,Phone,Type}=req.body || {};
    if(!Name || !Address || !Phone || !Type){
        return  res.status(404).json({message:"All Fields are Required!"})
    }

    const UpdatedHospital=await HospitalModel.findByIdAndUpdate(id,{
        Name:Name,
        Address:Address,
        Phone:Phone,
        Type:Type})
    if(!UpdateHospital){res.status(500).json({message:"the hospital is deleted before or doesnot exist !"})}
        return res.status(200).json({
      message: "Updated Successfully!!",
      hospital: UpdateHospital,
})
    } catch (error) {
      console.log(error)
            return  res.status(500).json({message:"interna server seror"})
    }
   
}