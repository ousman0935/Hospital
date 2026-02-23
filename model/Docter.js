import mongoose from "mongoose";
const DoctorSchema = new mongoose.Schema({
  Name: String,
  Email: { type: String, unique: true },
  Password: String,
  Status:{
    type:String,
    default:"Active",
  },
  Phone: String,
  Experience: Number,
  
  Specialization: {
  type: String,
  enum: [
    "General Practitioner",
    "Internal Medicine",
    "Family Medicine",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Psychiatrist",
    "Endocrinologist",
    "Gastroenterologist",
    "Nephrologist",
    "Pulmonologist",
    "Rheumatologist",
    "Hematologist",
    "Infectious Disease Specialist",
    "General Surgeon",
    "Cardiothoracic Surgeon",
    "Neurosurgeon",
    "Orthopedic Surgeon",
    "Plastic Surgeon",
    "Urologist",
    "Vascular Surgeon",
    "Pediatric Surgeon",
    "ENT (Otolaryngologist)",
    "Ophthalmologist",
    "Gynecologist",
    "Obstetrician",
    "Radiologist",
    "Pathologist",
    "Anesthesiologist",
    "Emergency Medicine",
    "Critical Care Specialist",
    "Oncologist",
    "Immunologist",
    "Allergist",
    "Sports Medicine Specialist",
    "Geriatrician",
    "Pain Management Specialist"
  ],
  required: true
},
 HospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },

});

export const DoctorModel = mongoose.model("doctor", DoctorSchema);
