// routes/contacts.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// @route   POST /api/contacts
// @desc    Create or update a contact
// @access  Public
router.post("/", async (req, res) => {
  const { contactType, username, phoneNumber, email } = req.body;

  try {
    let contact = await Contact.findOne({ contactType });

    if (contact) {
      // Add new contact to existing contact type
      contact.contacts.push({ username, phoneNumber, email });
    } else {
      // Create new contact type with the contact
      contact = new Contact({
        contactType,
        contacts: [{ username, phoneNumber, email }],
      });
    }

    await contact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// Endpoint to get unique contact types
router.get("/types", async (req, res) => {
    try {
      const types = await Contact.distinct("contactType");
      res.json(types);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch contact types" });
    }
  });
  router.get("/", async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });
  
module.exports = router;
