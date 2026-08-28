import express from "express";
import {
  doctorLogin,
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorSlots,
  addDoctorSlot,
  deleteDoctorSlot,
  getDoctorAppointments,
  updateAppointmentStatusByDoctor,
  getAllDoctors,
  getDoctorById,
} from "../controllers/doctor.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { isDoctor } from "../middlewares/role.middleware.js";
import { handleUpload, uploadImage } from "../utils/multer.js";

const router = express.Router();

// ── Public routes ─────────────────────────────────────────────────────────
router.post("/login",  doctorLogin);
router.get ("/all",    getAllDoctors);    

// ── Doctor-only routes (requires doctor JWT) ──────────────────────────────
// Applied individually to avoid blocking the public /:id route

// Profile
router.get("/profile", protectRoute, isDoctor, getDoctorProfile);
router.put("/profile", protectRoute, isDoctor, handleUpload(uploadImage), updateDoctorProfile);

// Slots
router.get   ("/slots",          protectRoute, isDoctor, getDoctorSlots);
router.post  ("/slots",          protectRoute, isDoctor, addDoctorSlot);
router.delete("/slots/:slotId",  protectRoute, isDoctor, deleteDoctorSlot);

// Appointments (doctor sees their own)
router.get("/appointments",  protectRoute, isDoctor, getDoctorAppointments);
router.put("/appointments/:id/status", protectRoute, isDoctor, updateAppointmentStatusByDoctor);

// ── Dynamic Public routes (Must be at the very bottom) ────────────────────
router.get ("/:id",getDoctorById);

export default router;
