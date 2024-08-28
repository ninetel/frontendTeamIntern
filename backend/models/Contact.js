// models/Contact.js
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  contactType: {
    type: String,
    required: true,
  },
  contacts: [
    {
      username: String,
      phoneNumber: String,
      email: String,
    },
  ],
});

module.exports = mongoose.model("Contact", ContactSchema);