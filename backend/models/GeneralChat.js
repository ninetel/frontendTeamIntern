const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalChatSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  sender_id: { type: String, required: false }, // Ensure this line is correct
  receiver_id: { type: String, required: false }, // Ensure this line is correct

}, { collection: 'generalChats' });

module.exports = mongoose.model('GeneralChat', generalChatSchema);
