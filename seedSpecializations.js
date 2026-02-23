import mongoose from "mongoose";
import { SpecializationModel } from "./model/Specialization.js";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.db_connection)
  .then(() => console.log("Connected Successfully ✅"))
  .catch((err) => console.log(err));
const specializations = [

  // 🩺 General Medicine
  { name: "General Practitioner", division: "General Medicine" },
  { name: "Family Medicine", division: "General Medicine" },
  { name: "Internal Medicine", division: "General Medicine" },

  // ❤️ Heart & Blood
  { name: "Cardiologist", division: "Heart & Blood" },
  { name: "Cardiothoracic Surgeon", division: "Heart & Blood" },
  { name: "Hematologist", division: "Heart & Blood" },
  { name: "Vascular Surgeon", division: "Heart & Blood" },

  // 🧠 Brain & Nervous System
  { name: "Neurologist", division: "Brain & Nervous System" },
  { name: "Neurosurgeon", division: "Brain & Nervous System" },
  { name: "Psychiatrist", division: "Brain & Nervous System" },

  // 👶 Pediatrics
  { name: "Pediatrician", division: "Pediatrics" },
  { name: "Neonatologist", division: "Pediatrics" },
  { name: "Pediatric Surgeon", division: "Pediatrics" },

  // 👩 Women’s Health
  { name: "Gynecologist", division: "Women’s Health" },
  { name: "Obstetrician", division: "Women’s Health" },

  // 🦴 Bones & Muscles
  { name: "Orthopedic Surgeon", division: "Bones & Muscles" },
  { name: "Rheumatologist", division: "Bones & Muscles" },
  { name: "Sports Medicine Specialist", division: "Bones & Muscles" },

  // 🌬 Lungs
  { name: "Pulmonologist", division: "Respiratory System" },

  // 🍽 Digestive
  { name: "Gastroenterologist", division: "Digestive System" },
  { name: "General Surgeon", division: "Digestive System" },

  // 🧴 Skin
  { name: "Dermatologist", division: "Skin & Cosmetic" },
  { name: "Plastic Surgeon", division: "Skin & Cosmetic" },

  // 🧪 Diagnostics
  { name: "Radiologist", division: "Diagnostics" },
  { name: "Pathologist", division: "Diagnostics" },

  // 🚨 Emergency
  { name: "Emergency Medicine Specialist", division: "Emergency & Critical Care" },
  { name: "Critical Care Specialist", division: "Emergency & Critical Care" },
  { name: "Anesthesiologist", division: "Emergency & Critical Care" },

  // 🎗 Cancer
  { name: "Oncologist", division: "Cancer Care" },
  { name: "Radiation Oncologist", division: "Cancer Care" }

];

const seed = async () => {
  try {
    await SpecializationModel.deleteMany();
    await SpecializationModel.insertMany(specializations);
    console.log("Specializations with Divisions Added ✅");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seed();