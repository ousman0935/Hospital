import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const DivisionModel = mongoose.model("Division", divisionSchema);