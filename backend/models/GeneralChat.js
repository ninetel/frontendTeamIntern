const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

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
    // default: () => moment().tz('Asia/Kathmandu').toDate(),
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
  // receiver_id: { type: String, required: false }, // Ensure this line is correct

}, { collection: 'generalChats' });

generalChatSchema.pre('save', function(next) {
  // Convert the timestamp to 'Asia/Kathmandu' timezone
  this.timestamp = moment(this.timestamp).tz('Asia/Kathmandu').toDate();
  next();
});


module.exports = mongoose.model('generalChats', generalChatSchema);
