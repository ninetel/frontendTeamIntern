const mongoose = require('mongoose');
const Staff = require('../models/Staff');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function cleanUpEmails() {
  const staffs = await Staff.find({ email: null });

  for (const staff of staffs) {
    staff.email = 'placeholder@example.com'; // Use a placeholder or remove these documents
    await staff.save();
  }

  // console.log('Cleaned up null emails.');
  mongoose.disconnect();
}

// cleanUpEmails();