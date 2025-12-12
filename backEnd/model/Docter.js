import mongoose from "mongoose";
const DoctorSchema = new mongoose.Schema({
  Name: String,
  Email: { type: String, unique: true },
  Password: String,
  Phone: String,
  Experience: Number,
  Specialization: {
  type: String,
  enum: [
    "Cardiologist",
    "Dermatologist",
    "Dentist",
    "Gynecologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician",
    "Psychiatrist",
    "General Practitioner"
  ],
  required: true
},
 HospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  }
});
export const DoctorModel = mongoose.model("doctor", DoctorSchema);
