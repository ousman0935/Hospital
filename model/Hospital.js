import mongoose from "mongoose";
const HospitalSchema = new mongoose.Schema({
  Name: {type: String,
    required: true},
  Address: {type: String,
    required: true,},
  Phone: {
    type: String,
    required: true,
    unique: true},
  Type: String, // private, gov, clinic, etc
   Email: {
    type: String,
    required: true,
    unique: true, // avoid duplicate emails
    lowercase: true,
  },
    Description: {
    type: String,
    required: false, // optional
    default: ""
  },
    Logo: { type: String },
  Cover: { type: String },

});
export const HospitalModel = mongoose.model("Hospital", HospitalSchema);
