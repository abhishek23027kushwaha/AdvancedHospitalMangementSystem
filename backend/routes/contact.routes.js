import express from "express";
import { getContacts, updateContacts } from "../controllers/contact.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", getContacts);
router.put("/", protectRoute, isAdmin, updateContacts);

export default router;
