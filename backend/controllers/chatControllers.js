// const Chat = require('../models/Chat');
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
// const path = require('path');
// const fetch = require('node-fetch');
// const mongoose = require("mongoose");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// exports.uploadImage = upload.single('image');

// exports.uploadImageHandler = (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   res.json({ url: `/uploads/${req.file.filename}` });
// };

// exports.sendMessage = async (req, res) => {
//   const { userId, text, image } = req.body;

//   try {
//     let chat;
//     if (mongoose.Types.ObjectId.isValid(userId)) {
//       chat = await Chat.findOne({ userId: mongoose.Types.ObjectId(userId) });
//     }

//     if (!chat) {
//       chat = new Chat({ userId: mongoose.Types.ObjectId(userId), messages: [] });
//     }

//     const newMessage = {
//       text,
//       type: 'sent',
//       image
//     };

//     chat.messages.push(newMessage);
//     await chat.save();

//     // Simulate sending the message to the third-party API server
//     const apiPayload = {
//       message: text,
//       image: image ? `http://localhost:5000${image}` : ''
//     };

//     const apiResponse = await fetch('http://third.server/api/endpoint', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(apiPayload)
//     });

//     const apiData = await apiResponse.json();

//     const responseMessage = {
//       text: apiData.message,
//       type: 'received'
//     };

//     chat.messages.push(responseMessage);
//     await chat.save();

//     res.json(apiData);
//   } catch (error) {
//     console.error('Error in sendMessage:', error);
//     res.status(500).json({ message: 'Error sending message', error });
//   }
// };
const Chat = require('../models/Chat'); // Adjust the path as necessary
exports.getUrls = async (req, res) => {
  try {
    const urls = await Chat.distinct("url");
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
};

exports.getLastMessages = async (req, res) => {
  const { userId, url } = req.query;

  if (!userId || !url) {
    return res.status(400).json({ error: "userId and url are required" });
  }

  try {
    const messages = await Chat.find({ userId, url }).sort({ timestamp: -1 }).limit(10);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
