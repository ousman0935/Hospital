import mongoose from "mongoose";
import { userModel } from "../model/Model.js";

export const addLocation = async (req, res) => {
  try {
    const { Region, City, SubCity } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    if (!Region) {
      return res.status(400).json({ error: "Region is required" });
    }

    if (!City && !SubCity) {
      return res.status(400).json({
        error: "At least one of City or SubCity is required",
      });
    }

    // ✅ build update safely
    const updateData = {};
    if (Region) updateData["Location.Region"] = Region;
    if (City) updateData["Location.City"] = City;
    if (SubCity) updateData["Location.SubCity"] = SubCity;

    const locationUpdate = await userModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!locationUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      data: locationUpdate,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
