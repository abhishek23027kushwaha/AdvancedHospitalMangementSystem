import mongoose from "mongoose";
import "dotenv/config";
import Doctor from "./models/doctor.model.js";

const insertDummyDoctor = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const count = await Doctor.countDocuments();
    if (count > 0) {
      console.log("Doctors already exist in DB. Count:", count);
      process.exit(0);
    }

    const dummyDoctor = new Doctor({
      name: "Dr. Aditi Singhvi",
      email: "aditi.demo@example.com",
      password: "password123", // Will be hashed in pre-save if the model has a hook
      specialization: "Cardiologist", // Using an enum value from the model
      fee: 900,
      image: "https://via.placeholder.com/150",
      qualifications: "MBBS, MD (General Medicine)",
      experience: "15",
      location: "Narayana Institute of Cardiac Sciences",
      about: "Clinical Lead - Adult Heart Failure and Transplant",
      available: true,
      slots: [
        { date: "01 Sep 2026", time: "10:00 AM", isBooked: false },
        { date: "01 Sep 2026", time: "11:00 AM", isBooked: false },
        { date: "01 Sep 2026", time: "12:00 PM", isBooked: false },
        { date: "02 Sep 2026", time: "10:00 AM", isBooked: false },
      ]
    });

    await dummyDoctor.save();
    console.log("Dummy doctor inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error inserting dummy doctor:", error);
    process.exit(1);
  }
};

insertDummyDoctor();
