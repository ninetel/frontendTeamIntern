const Contact = require("../models/contactModel");

const addContact = async (req, res) => {
  const { username, phoneNumber, email, contactType } = req.body;

  const newContact = new Contact({
    username,
    phoneNumber,
    email,
    contactType,
  });

  try {
    await newContact.save();
    res.status(200).send("Contact added successfully");
  } catch (error) {
    res.status(500).send("Error adding contact: " + error);
  }
};

module.exports = { addContact };
