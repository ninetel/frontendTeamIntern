const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// @route   POST /api/contacts
// @desc    Create or update a contact
// @access  Public
router.post("/", async (req, res) => {
  const { contactType, username, phoneNumber, email } = req.body;

  console.log("Received request to create or update contact:", { contactType, username, phoneNumber, email });

  try {
    let contact = await Contact.findOne({ contactType });
    console.log("Found contact type:", contactType, contact);

    if (contact) {
      // Add new contact to existing contact type
      console.log("Updating existing contact type:", contactType);
      contact.contacts.push({ username, phoneNumber, email });
    } else {
      // Create new contact type with the contact
      console.log("Creating new contact type:", contactType);
      contact = new Contact({
        contactType,
        contacts: [{ username, phoneNumber, email }],
      });
    }

    await contact.save();
    console.log("Contact saved successfully:", contact);
    res.json(contact);
  } catch (err) {
    console.error("Error in POST /api/contacts:", err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to get unique contact types
router.get("/types", async (req, res) => {
  console.log("Fetching unique contact types...");
  try {
    const types = await Contact.distinct("contactType");
    console.log("Unique contact types:", types);
    res.json(types);
  } catch (err) {
    console.error("Error fetching contact types:", err.message);
    res.status(500).json({ error: "Failed to fetch contact types" });
  }
});
// Endpoint to get contacts by type
router.get("/content/:type", async (req, res) => {
  const { type } = req.params;
  console.log("Fetching contacts for type:", type);

  try {
    const contact = await Contact.findOne({ contactType: type });
    if (!contact) {
      return res.status(404).json({ error: "Contact type not found" });
    }
    console.log("Fetched contacts for type:", type, contact);
    res.json(contact.contacts); // Return only the contacts array
  } catch (err) {
    console.error("Error fetching contact content:", err.message);
    res.status(500).json({ error: "Failed to fetch contact content" });
  }
});
// Get all contacts
router.get("/", async (req, res) => {
  console.log("Fetching all contacts...");
  try {
    const contacts = await Contact.find();
    console.log("Fetched contacts:", contacts);
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err.message);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});
// Edit contact by ID
router.put('/edit_contact/:id', async (req, res) => {
  const { id } = req.params;
  const { username, phoneNumber, email } = req.body;

  try {
    const contactType = await Contact.findOneAndUpdate(
      { 'contacts._id': id },
      {
        $set: {
          'contacts.$.username': username,
          'contacts.$.phoneNumber': phoneNumber,
          'contacts.$.email': email,
        },
      },
      { new: true }
    );

    if (!contactType) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contactType);
  } catch (error) {
    console.error('Error editing contact:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to delete a contact by id
router.delete('/delete_contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { 'contacts._id': req.params.id },
      { $pull: { contacts: { _id: req.params.id } } },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Bulk create or update contacts
router.post("/bulk", async (req, res) => {
  const contacts = req.body;
  console.log("Received contacts data for bulk operation:", contacts);

  try {
    for (const contact of contacts) {
      console.log("Processing contact:", contact);
      let existingContactType = await Contact.findOne({ contactType: contact.contactType });

      if (existingContactType) {
        console.log("Found existing contact type:", contact.contactType);
        existingContactType.contacts.push({
          username: contact.username,
          phoneNumber: contact.phoneNumber,
          email: contact.email,
        });
        await existingContactType.save();
        console.log("Updated existing contact type:", contact.contactType);
      } else {
        console.log("Creating new contact type:", contact.contactType);
        const newContact = new Contact({
          contactType: contact.contactType,
          contacts: [{
            username: contact.username,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
          }],
        });
        await newContact.save();
        console.log("Created new contact type:", contact.contactType);
      }
    }

    res.json({ message: "Contacts saved successfully!" });
  } catch (err) {
    console.error("Error in POST /api/contacts/bulk:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
