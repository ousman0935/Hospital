import { SpecializationModel } from "../model/Specialization.js";

export const GetSpecialization=async(req,res)=>{
    try {
      const specializations=await SpecializationModel.find();
      if(!specializations){
       return res.status(400).json({message:"The eror "})
      }  
      res.status(200).json({specializations:specializations});
    } catch (error) {
       res.status(500).json({message:"internal Server Error"}) 
       console.log(error);
    }

}

export const GetSpecializationInONeDivistion=async (req,res)=>{
  try {
    const {id}=req.params;
   if(!id){
      res.status(404).json({messgae:"Id Parametter is required Dear"});
   }
   const SpecializationByDivistion=await SpecializationModel.find({division:id});
   if(!SpecializationByDivistion){
      res.status(500).json({message:"Unkown Error!!"});

   }
   res.status(200).json({specialazation:SpecializationByDivistion});

   
  } catch (error) {
         res.status(500).json({message:"Internal sever Error!!"});
     console.log(error);
  }
  
}
export const addSpecialaization=async(req,res)=>{
   try {
      const {name,division}=req?.body;
      if(!name || !division){
         return res.status(400).json({message:"division and name are requiered! "});
      }
      const existBefore=await SpecializationModel.findOne({name,division});
      if(existBefore){
         return res.status(400).json({message:"division and name are registerd Before requiered! "});

      }
        const newspecialization=await SpecializationModel.create({name,division});
    
             res.status(201).json({message:"Created successfully 💕💕 ",
                   specialazation:newspecialization
             });

   } catch (error) {
               return res.status(500).json({message:"Internal Server Error! "});

   }
}