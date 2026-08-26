import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import { sendOtpViaTwilio, checkOtpViaTwilio } from "../utils/sms.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ── helpers ───────────────────────────────────────────────────────────────
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// In-memory OTP store (only used in dev fallback when Twilio is not configured)
const devOtpStore = new Map();

// ── POST /api/auth/send-otp ───────────────────────────────────────────────
export const sendRegistrationOtp = async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: "Mobile number is required" });
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return res.status(400).json({ success: false, message: "Please enter a valid 10-digit mobile number" });
    }

    // Check if email already exists
    if (email) {
      const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingEmail) {
        return res.status(409).json({ success: false, message: "Email is already registered" });
      }
    }

    // Send OTP via Twilio Verify Service
    const result = await sendOtpViaTwilio(cleanPhone);

    // Dev fallback: store the OTP locally for testing
    if (result.provider === "dev" && result.devOtp) {
      devOtpStore.set(cleanPhone, { otp: result.devOtp, expiresAt: Date.now() + 10 * 60 * 1000 });
    }

    return res.status(200).json({
      success: true,
      message: `Verification code sent to +91 ${cleanPhone.slice(-10)}`,
      phone: cleanPhone,
      // Only expose OTP in dev mode for testing
      otp: result.devOtp || undefined,
    });
  } catch (err) {
    console.error("sendRegistrationOtp error:", err);
    return res.status(500).json({ success: false, message: err.message || "Failed to send OTP. Please try again." });
  }
};

// ── POST /api/auth/register ───────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, gender, age, otp } = req.body;

    // Validation
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ success: false, message: "Name, email, password and mobile number are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return res.status(400).json({ success: false, message: "Please enter a valid 10-digit mobile number" });
    }

    // Verify OTP
    if (!otp) {
      return res.status(400).json({ success: false, message: "Please enter the verification code" });
    }

    // Try Twilio Verify first, then dev fallback
    const verifyResult = await checkOtpViaTwilio(cleanPhone, otp);

    if (verifyResult.provider === "dev") {
      // Dev fallback: check from local store
      const stored = devOtpStore.get(cleanPhone);
      if (!stored) {
        return res.status(400).json({ success: false, message: "OTP expired or not requested. Please request a new code." });
      }
      if (Date.now() > stored.expiresAt) {
        devOtpStore.delete(cleanPhone);
        return res.status(400).json({ success: false, message: "OTP has expired. Please request a new code." });
      }
      if (stored.otp !== otp.toString().trim()) {
        return res.status(400).json({ success: false, message: "Invalid verification code." });
      }
      devOtpStore.delete(cleanPhone);
    } else if (!verifyResult.valid) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code. Please try again." });
    }

    // OTP verified! Create the user account
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      phone: cleanPhone,
      gender: gender || "",
      age: age || null,
    });

    const token = generateToken(user._id, user.role);
    res.cookie("token", token, cookieOpts);

    return res.status(201).json({
      success: true,
      message: "Mobile verified & account created successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        age: user.age,
        credits: user.credits,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── POST /api/auth/login ──────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);
    res.cookie("token", token, cookieOpts);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        age: user.age,
        credits: user.credits,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── POST /api/auth/logout ─────────────────────────────────────────────────
export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logged out successfully" });
};

// ── GET /api/auth/me ──────────────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── PUT /api/auth/update-profile ──────────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, gender, age, avatar } = req.body;
    const updates = {};
    if (name)   updates.name   = name.trim();
    if (phone)  updates.phone  = phone.trim();
    if (gender) updates.gender = gender;
    if (age)    updates.age    = Number(age);
    if (avatar) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select("-password");
    return res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── PUT /api/auth/change-password ─────────────────────────────────────────
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Both passwords are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.userId);
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    return res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── POST /api/auth/google ─────────────────────────────────────────────────
// Frontend fetches user info from Google via access token, then posts the verified data here.
export const googleAuth = async (req, res) => {
  try {
    const { googleId, email, name, avatar } = req.body;
    if (!googleId || !email) {
      return res.status(400).json({ success: false, message: "Google user data is required" });
    }

    // Find or create (upsert) the user
    let user = await User.findOne({ $or: [{ googleId }, { email: email.toLowerCase() }] });
    if (user) {
      // Link googleId if they had signed up with email before
      if (!user.googleId) {
        user.googleId = googleId;
        if (avatar && !user.avatar) user.avatar = avatar;
        await user.save();
      }
    } else {
      user = await User.create({
        name: name || email.split("@")[0],
        email: email.toLowerCase(),
        password: await bcrypt.hash(Math.random().toString(36) + Date.now(), 12),
        googleId,
        avatar: avatar || "",
      });
    }

    const token = generateToken(user._id, user.role);
    res.cookie("token", token, cookieOpts);

    return res.status(200).json({
      success: true,
      message: "Google authentication successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        credits: user.credits,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("googleAuth error:", err);
    return res.status(500).json({ success: false, message: "Server error during Google auth" });
  }
};
