import express from "express";
import {
  getAllHospitals,
  getHospitalCities,
  addHospital,
  updateHospital,
  deleteHospital
} from "../controllers/hospital.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import { handleUpload, uploadImage } from "../utils/multer.js";

const router = express.Router();

// Public routes
router.get("/", getAllHospitals);
router.get("/cities", getHospitalCities);

// Admin only routes
router.post("/add", protectRoute, isAdmin, handleUpload(uploadImage), addHospital);
router.put("/:id", protectRoute, isAdmin, handleUpload(uploadImage), updateHospital);
router.delete("/:id", protectRoute, isAdmin, deleteHospital);

export default router;
