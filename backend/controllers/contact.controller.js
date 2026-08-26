import Contact from "../models/contact.model.js";

export const getContacts = async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({});
    }
    res.status(200).json({ success: true, contact });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateContacts = async (req, res) => {
  try {
    const { email, emergencyNumber, address } = req.body;
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({ email, emergencyNumber, address });
    } else {
      contact.email = email || contact.email;
      contact.emergencyNumber = emergencyNumber || contact.emergencyNumber;
      contact.address = address || contact.address;
      await contact.save();
    }
    res.status(200).json({ success: true, contact, message: "Contacts updated successfully" });
  } catch (error) {
    console.error("Error updating contacts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
