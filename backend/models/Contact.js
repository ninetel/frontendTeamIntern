// models/Contact.js
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  contactType: {
    type: String,
    required: true,
  },
  contacts: [
    {
      username: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Contact", ContactSchema);