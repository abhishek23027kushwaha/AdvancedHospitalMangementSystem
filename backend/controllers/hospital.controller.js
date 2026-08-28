import Hospital from "../models/hospital.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

// ── GET /api/hospitals ──────────────────────────────────────────────
export const getAllHospitals = async (req, res) => {
  try {
    const { city } = req.query;
    const filter = { isActive: true };
    if (city) {
      filter.city = new RegExp(`^${city}$`, "i"); // case insensitive exact match or contains
    }
    const hospitals = await Hospital.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, hospitals });
  } catch (error) {
    console.error("Error getting hospitals:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── GET /api/hospitals/cities ───────────────────────────────────────
export const getHospitalCities = async (req, res) => {
  try {
    const cities = await Hospital.distinct("city", { isActive: true });
    return res.status(200).json({ success: true, cities });
  } catch (error) {
    console.error("Error getting cities:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── POST /api/admin/hospitals/add ───────────────────────────────────
export const addHospital = async (req, res) => {
  try {
    const { name, city, address, contactNumber } = req.body;
    let { image } = req.body; // In case they pass a URL string
    
    if (!name || !city || !address) {
      return res.status(400).json({ success: false, message: "Name, city, and address are required" });
    }

    if (req.file) {
      const secureUrl = await uploadToCloudinary(req.file.buffer, "hospitals");
      if (secureUrl) {
        image = secureUrl;
      }
    }

    const newHospital = await Hospital.create({
      name,
      city,
      address,
      image: image || "",
      contactNumber: contactNumber || ""
    });

    return res.status(201).json({ success: true, message: "Hospital added successfully", hospital: newHospital });
  } catch (error) {
    console.error("Error adding hospital:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── PUT /api/admin/hospitals/:id ────────────────────────────────────
export const updateHospital = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    if (req.file) {
      const secureUrl = await uploadToCloudinary(req.file.buffer, "hospitals");
      if (secureUrl) {
        updates.image = secureUrl;
      }
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedHospital) {
      return res.status(404).json({ success: false, message: "Hospital not found" });
    }
    return res.status(200).json({ success: true, message: "Hospital updated successfully", hospital: updatedHospital });
  } catch (error) {
    console.error("Error updating hospital:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── DELETE /api/admin/hospitals/:id ─────────────────────────────────
export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: "Hospital not found" });
    }
    // Soft delete or hard delete? Let's do soft delete for safety
    hospital.isActive = false;
    await hospital.save();
    return res.status(200).json({ success: true, message: "Hospital deleted successfully" });
  } catch (error) {
    console.error("Error deleting hospital:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
