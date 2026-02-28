import mongoose from "mongoose";
import dotenv from "dotenv";
import { Division } from "./model/Division.js";
import { SpecializationModel } from "./model/Specialization.js";

dotenv.config();

mongoose.connect(process.env.db_connection)
  .then(() => console.log("Connected Successfully ✅"))
  .catch((err) => console.log(err));

const divisionsData = [
  { name: "General Medicine" },
  { name: "Heart & Blood" },
  { name: "Brain & Nervous System" },
  { name: "Pediatrics" },
  { name: "Women’s Health" },
  { name: "Bones & Muscles" },
  { name: "Respiratory System" },
  { name: "Digestive System" },
  { name: "Skin & Cosmetic" },
  { name: "Diagnostics" },
  { name: "Emergency & Critical Care" },
  { name: "Cancer Care" }
];

const specializationsData = [
  { name: "General Practitioner", division: "General Medicine" },
  { name: "Family Medicine", division: "General Medicine" },
  { name: "Internal Medicine", division: "General Medicine" },

  { name: "Cardiologist", division: "Heart & Blood" },
  { name: "Cardiothoracic Surgeon", division: "Heart & Blood" },
  { name: "Hematologist", division: "Heart & Blood" },
  { name: "Vascular Surgeon", division: "Heart & Blood" },

  { name: "Neurologist", division: "Brain & Nervous System" },
  { name: "Neurosurgeon", division: "Brain & Nervous System" },
  { name: "Psychiatrist", division: "Brain & Nervous System" },

  { name: "Pediatrician", division: "Pediatrics" },
  { name: "Neonatologist", division: "Pediatrics" },
  { name: "Pediatric Surgeon", division: "Pediatrics" },

  { name: "Gynecologist", division: "Women’s Health" },
  { name: "Obstetrician", division: "Women’s Health" },

  { name: "Orthopedic Surgeon", division: "Bones & Muscles" },
  { name: "Rheumatologist", division: "Bones & Muscles" },
  { name: "Sports Medicine Specialist", division: "Bones & Muscles" },

  { name: "Pulmonologist", division: "Respiratory System" },

  { name: "Gastroenterologist", division: "Digestive System" },
  { name: "General Surgeon", division: "Digestive System" },

  { name: "Dermatologist", division: "Skin & Cosmetic" },
  { name: "Plastic Surgeon", division: "Skin & Cosmetic" },

  { name: "Radiologist", division: "Diagnostics" },
  { name: "Pathologist", division: "Diagnostics" },

  { name: "Emergency Medicine Specialist", division: "Emergency & Critical Care" },
  { name: "Critical Care Specialist", division: "Emergency & Critical Care" },
  { name: "Anesthesiologist", division: "Emergency & Critical Care" },

  { name: "Oncologist", division: "Cancer Care" },
  { name: "Radiation Oncologist", division: "Cancer Care" }
];

const seed = async () => {
  try {
    // 1️⃣ Clear old data
    await SpecializationModel.deleteMany();
    await Division.deleteMany();

    console.log("Old Divisions and Specializations cleared ✅");

    // 2️⃣ Insert divisions
    const insertedDivisions = await Division.insertMany(divisionsData);
    console.log("Divisions added ✅");

    // 3️⃣ Map division name → ObjectId
    const divisionMap = {};
    insertedDivisions.forEach(div => {
      divisionMap[div.name] = div._id;
    });

    // 4️⃣ Prepare specializations with proper division ObjectId
    const specializationsToInsert = specializationsData.map(spec => ({
      name: spec.name,
      division: divisionMap[spec.division]
    }));

    // 5️⃣ Insert specializations
    await SpecializationModel.insertMany(specializationsToInsert);
    console.log("Specializations added ✅");

    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seed();