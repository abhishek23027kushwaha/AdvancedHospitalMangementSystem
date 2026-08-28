import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";

// ── Routes ────────────────────────────────────────────────────────────────
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import patientAppointmentRoutes from "./routes/patientAppointment.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import serviceAppointmentRoutes from "./routes/serviceAppointment.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import hospitalRoutes from "./routes/hospital.routes.js";

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in dev/production with credentials
    }
  },
  credentials: true,       // allow cookies
}));
app.use(cookieParser());

// ── DB ────────────────────────────────────────────────────────────────────
// connectDB is called at the bottom before app.listen
// ── Health check ──────────────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ success: true, message: "MediCare API is running 🚀" }));

// ── API Routes ────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient/appointments", patientAppointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/service-appointments", serviceAppointmentRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/hospitals", hospitalRoutes);
// ── 404 handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` });
});

// ── Global error handler ──────────────────────────────────────────────────
import fs from "fs";
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const logMsg = `[${new Date().toISOString()}] ${req.method} ${req.url} - Error: ${err.message}\nStack: ${err.stack}\n`;
  fs.appendFileSync("./error_logs.log", logMsg);
  res.status(500).json({ success: false, message: "Internal server error", debug: err.message });
});

// ── Start ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to database:", err);
});