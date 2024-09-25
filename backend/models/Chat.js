// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   text: String,
//   type: { type: String, enum: ['sent', 'received'] },
//   image: String,
//   timestamp: { type: Date, default: Date.now }
// });

// const chatSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
//   messages: [messageSchema]
// });

// const Chat = mongoose.model('Chat', chatSchema);

// module.exports = Chat;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  messageId: {
    type: String,
    required: true,
  },
  uid: { type: String, required: true }, // Ensure this line is correct

});

module.exports = mongoose.model('Chat', chatSchema);
