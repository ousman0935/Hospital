import { DivisionModel } from "../model/Division.js";
export const getDivisions=async(req,res)=>{
    try {
  
       const divisionList=await DivisionModel.find({status:true});
       if(!divisionList){
    return res.status(400).json({message:"not successfull! "})

       }
      res.status(200).json({divisionList:divisionList});


    } catch (error) {
       res.status(500).json({message:"internal Server Error"}) 
       console.log(error); 
    }

}
export const getOneDivision=async(req,res)=>{
   try {
      const {id}=req?.params;
   } catch (error) {
      return res.status(500).json({message:"Internal server error!"})
   }
   const division=await DivisionModel.findById({id});
  res.status(200).json({division:division})


  
}
export const addDivision=async(req,res)=>{
   try {
      const {name,description,icon}=req?.body;
      if(!name){
         return res.status(400).json({message:"name is required!"});
      }
      const payload={name,
            ...(description&&{description}),
            ...(icon&&{icon})
      }
     
      const newDivision=await DivisionModel.create(payload);
      if(!newDivision){
        return  res.status(400).json({message:"not Successfull Dear"});
      }
    res.status(201).json({newDivision:newDivision,
                           message:"Inserted Successfully!"
    });
      
   } catch (error) {
          res.status(500).json({message:"Internal Server Error!!"});

   }
}
export const deleteDivision=async(req,res)=>{
   try {
      const {id}=req?.params;
      if(!id){
        return res.status(400).json({message:"the id Parametter is needed!"});
      }
      const deletedDivion=await DivisionModel.findByIdAndDelete(id);
      if(!deletedDivion){
    return res.status(400).json({message:"Some thig happen in deleting"});

      }
      res.status(200).json({message:"deleted Successfullly",
                           division:deletedDivion
      })
   } catch (error) {
        res.status(500).json({message:"Internal server error!"});
  
   }
}