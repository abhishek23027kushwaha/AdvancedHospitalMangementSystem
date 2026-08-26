import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    email: { type: String, default: "contact@medicare.com" },
    emergencyNumber: { type: String, default: "1800-123-4567" },
    address: { type: String, default: "123 Medical Avenue, Health City" },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
