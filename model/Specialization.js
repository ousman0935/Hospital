import mongoose from "mongoose";

const SpecializationScehma=new mongoose.Schema(
   { name:{type:String,
            required:true,
           unique: true,
          trim: true
  },
  division: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Division',
      required: true
    }
}
    , { timestamps: true }
)
export const SpecializationModel=mongoose.model("Specialization",SpecializationScehma)