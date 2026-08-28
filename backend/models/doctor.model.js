import mongoose from "mongoose";

// Each time slot: "22 Mar 2026, 11:00 AM"
const slotSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },  // "22 Mar 2026"
    time: { type: String, required: true },  // "11:00 AM"
    isBooked: { type: Boolean, default: false },
  },
  { _id: true }
);

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    plainPassword: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    specialization: {
      type: [String],
      required: [true, "Specialization is required"],
      enum: [
        "Adult Cardiology", "Adult Critical Care Medicine", "Adult Haemato-Oncology And Bmt", "Anesthesiology", "Audiology",
        "Blood Bank", "Breast Oncology & Oncoplastic Surgery",
        "Cancer Care", "Cardiac Sciences", "Cardiac Surgery - Adult", "Cardiology", "Cardiology - Paediatric", "Child & Adolescent Psychiatry", "Clinical Genetics", "Clinical Hematology", "Clinical Immunology & Rheumatology", "Clinical Nutrition & Dietetics", "Clinical Psychology", "Congenital Adult Heart Disease", "Cosmetology", "Cranio-Maxillo Facial Surgery", "Critical Care Medicine",
        "Dental", "Dermatology", "Developmental / Behavioural Paediatrics", "Diabetology",
        "E.N.T", "Electrophysiology", "Emergency Medicine", "Endocrinology, Diabetes & Metabolic Medicine",
        "Family Medicine",
        "Gastro Sciences", "Gastrointestinal Oncology", "General & Gi Surgery", "General Administration", "General Medicine", "General Surgery", "Geriatric Medicine", "Gynaecologic Oncology", "Gynaecology",
        "Haemato-Oncology", "Haematology", "Head And Neck Oncology", "Headache & Facial Pain", "Hepatology & Liver Transplant Hepatology",
        "Imaging & Nuclear Medicine", "Infectious Diseases", "Interventional & Endovascular Radiology", "Interventional Neurology", "Interventional Pulmonology", "Interventional Radiology",
        "Laboratory Medicine", "Liver Transplant", "Liver Transplantation And Hepatobiliary Surgery",
        "Medical Administration", "Medical Gastroenterology", "Medical Oncology", "Medical Oncology & Hemato-Oncology", "Minimal Access Gi And Bariatric Surgery", "Musculoskeletal Oncology",
        "Neonatology", "Nephrology", "Neuro Otology", "Neuro Rehabilitation", "Neuro Sciences", "Neurology", "Neurosurgery", "Neurosurgery & Spine Surgery", "Nuclear Medicine", "Nursing",
        "Obstetrics & Gynaecology", "Ophthalmology", "Oral Oncology & Maxillofacial Surgery", "Orthopaedic Surgery", "Orthopaedics", "Orthopaedics & Joint Replacement",
        "Paediatric And Congenital Heart Surgery", "Paediatric Cardiology", "Paediatric Clinical Immunology & Rheumatology",
        "Paediatric Gastroenterology", "Paediatric Haematology Oncology", "Paediatric Medicine", "Paediatric Medicine-Paediatric Critical Care",
        "Paediatric Nephrology", "Paediatric Neurology", "Paediatric Neurophysiology", "Paediatric Neurosurgery", "Paediatric Oncology",
        "Paediatric Oncology, Haemato-Oncology & Bmt", "Paediatric Ophthalmology", "Paediatric Orthodontics", "Paediatric Orthopaedics",
        "Paediatric Pulmonology", "Paediatric Rheumatology", "Paediatric Spine Surgery", "Paediatric Surgery", "Pain & Palliation - Oncology",
        "Pain Management & Palliative Care", "Paramedical", "Pathology", "Perinatology & Fetal Intervention", "Physical Medicine & Rehabilitation",
        "Physiotherapy & Physical Rehabilitation", "Plastic Surgery", "Preventive Oncology", "Psychiatry", "Psychiatry & Psycho-Oncology",
        "Psycho Oncology", "Pulmonology",
        "Radiation Oncology", "Radiology", "Renal Sciences", "Reproductive Medicine", "Rheumatology",
        "Speech And Swallow Rehabilitation", "Spine Surgery", "Surgical Gastroenterology", "Surgical Oncology",
        "Thoracic And Vascular Surgery", "Thoracic Surgery", "Transfusion Medicine (Blood Bank)",
        "Uro Oncology", "Urology",
        "Vascular & Endovascular Surgery",
        "Yoga"
      ]
    },
    experience: {
      type: Number,  // years
      default: 0,
    },
    fee: {
      type: Number,
      required: [true, "Consultation fee is required"],
    },
    about: {
      type: String,
      default: "",
    },
    image: {
      type: String,  // Cloudinary / S3 URL
      default: "",
    },
    available: {
      type: Boolean,
      default: true,
    },
    // Time slots added from Add Service / Doctor panel
    slots: [slotSchema],
    // Total earnings (updated on each completed appointment)
    totalEarnings: {
      type: Number,
      default: 0,
    },
    qualifications: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    patients: {
      type: String,
      default: "0",
    },
    success: {
      type: String,
      default: "100",
    },
    rating: {
      type: Number,
      default: 5,
    },
    role: {
      type: String,
      default: "doctor",
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
