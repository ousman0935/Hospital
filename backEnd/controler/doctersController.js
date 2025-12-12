import { DoctorModel } from "../model/Docter.js";
import { HospitalModel } from "../model/Hospital.js";
import bcrypt from 'bcrypt'

export const addDocter=async(req,res)=>{
    try {
         const {Name,Email,Password1,Password2, Phone, Experience, Specialization,HospitalId}=req.body || {};
         if (!Name || !Email || !Password1 || !Password2 || !HospitalId || !Specialization) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }
         const hospital=await HospitalModel.findById(HospitalId)
         if(!hospital){
           return res.status(404).json({message:"this hospital is not exist dear"}) }
         if(Password1!==Password2){
         return res.status(404).json({message:"Password donot match !!! "})

         }
         const existingDoctor = await DoctorModel.findOne({ Email });
        if (existingDoctor) {
            return res.status(409).json({ message: "A doctor with this email already exists." });
        }

        const Password=await bcrypt.hash(Password1,10);
        const newDocter=await DoctorModel.create(
            {    Name,
                 Email,
                 Password,
                 Phone,
                 Experience, 
                 Specialization,
                 HospitalId

            }    
        )
        if(!newDocter) return res.status(400).json({message:"some thing going wrong "});
        return res.status(201).json({message:"Created Succesfully",Docter:newDocter})
    } catch (error) {
        console.error("Error creating doctor:", error);

        // Handle specific Mongoose/Database errors if necessary, otherwise use 500
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
       return res.status(500).json({message:"interna server Error"});
    }

}
export const getAllDocters=async (req,res)=>{
    try {
        const users=await DoctorModel.find()
        .populate("HospitalId")
        if(!users || users.length===0){
          return  res.status(404).json({message:"users Collection is empty or not created at all"});
            
        }
        res.status(200).json({message:"succesfull !",users})
        
    } catch (error) {
        console.error("Error creating doctor:", error);

        // Handle specific Mongoose/Database errors if necessary, otherwise use 500
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
       return res.status(500).json({message:"interna server Error"});
        
    }
}
export const getDocter=async (req,res)=>{
    try {
            const {id}=req.params || {};
            const user=await DoctorModel.findById(id)
            .populate("HospitalId");
            if(!user){
                return res.status(404).json({message:"the user doesnot exist dear! "})
            }
           return res.status(200).json(user);



        
    } catch (error) {
          console.error("Error creating doctor:", error);

        // Handle specific Mongoose/Database errors if necessary, otherwise use 500
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
       return res.status(500).json({message:"interna server Error"});
        
        
    }
}


export const editDocter=async(req,res)=>{
    try {
        const {id}=req.params; // Using destructuring without the unnecessary || {}
        if(!id){
            return res.status(404).json({message:"The Doctor ID is required for editing."})
        }
        
        // Destructure ALL possible fields, including the two password fields
        const {Name, Email, Phone, Experience, Specialization, HospitalId, Password1, Password2} = req.body;
        
        const updateFields = {};
        
        // ----------------------------------------------------
        // --- 1. Handle Regular Fields (Set only if provided)
        // ----------------------------------------------------
        if (Name) updateFields.Name = Name;
        if (Email) updateFields.Email = Email;
        if (Phone) updateFields.Phone = Phone;
        if (Experience) updateFields.Experience = Experience;
        if (Specialization) updateFields.Specialization = Specialization;

        // ----------------------------------------------------
        // --- 2. Handle Password Update (Security First)
        // ----------------------------------------------------
        // Declare Password outside the block (Fix 1)
        let hashedPassword; 

        if (Password1 || Password2) {
            // Check if one is missing but the other is present
            if (!Password1 || !Password2) {
                return res.status(400).json({message:"Both Password1 and Password2 must be provided to update the password."});
            }
            // Check if passwords match
            if(Password1 !== Password2){
                return res.status(400).json({message:"Passwords Don't Match !!!"}) // Changed 404 to 400
            }
            
            // Hash the password
            hashedPassword = await bcrypt.hash(Password1, 10);
            
            // Add the hashed password to the update object (Fix 4 logic)
            updateFields.Password = hashedPassword; 
        } 

        // ----------------------------------------------------
        // --- 3. Handle Hospital ID (Conditional check)
        // ----------------------------------------------------
        if (HospitalId) {
            const hospital=await HospitalModel.findById(HospitalId)
            if(!hospital){
                return res.status(404).json({message:"The provided Hospital ID does not exist."}) 
            }
            // Add HospitalId to update object (Fix 3)
            updateFields.HospitalId = HospitalId;
        }

        // Require at least one field to update before hitting the database
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "Please provide at least one valid field to update." });
        }

        // ----------------------------------------------------
        // --- 4. Final Database Update
        // ----------------------------------------------------
        // Use the spread operator to pass the fields directly (Fix 2)
        const updatedDocter=await DoctorModel.findByIdAndUpdate(
            id, 
            { $set: updateFields }, // Using $set is a good practice for dynamic updates
            { new: true, runValidators: true } // {new:true} returns the updated document, {runValidators: true} ensures Mongoose validations run
        );

        // Changed 400 to 404 since if no doctor is found, it's a resource not found error
        if(!updatedDocter) return res.status(404).json({message:"Doctor not found or something went wrong during update."});
        
        return res.status(200).json({message:"Doctor Updated Successfully", Docter:updatedDocter}) // Changed 201 (Created) to 200 (OK) for updates

    } catch (error) {
        console.error("Error updating doctor:", error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({message:"Internal Server Error"});
    }
}
export const deleteDocter=async (req,res)=>{
    try {
           const {id}=req.params || {};
           const deletedDocter=await DoctorModel.findById(id);
           if(!deleteDocter){
         return   res.status(404).json({message:"the docter with the specified ID !!"})
           }
           const removedDocter=await DoctorModel.findOneAndDelete(id);
         if (!removedDocter) {
      return res.status(404).json({ message: "Doctor not found!" });
    }
        return res.status(200).json({message:"Deleted successfully !!",deleted:deletedDocter})
        
    } catch (error) {
        console.error("Error deleting doctor:", error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({message:"Internal Server Error"});
    }
        
    }
 
