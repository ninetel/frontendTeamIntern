const Chat = require('../models/Chat');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fetch = require('node-fetch');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('image');

exports.uploadImageHandler = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({ url: `/uploads/${req.file.filename}` });
};

exports.sendMessage = async (req, res) => {
  const { userId, text, image } = req.body;

  try {
    let chat = await Chat.findOne({ userId });

    if (!chat) {
      chat = new Chat({ userId, messages: [] });
    }

    const newMessage = {
      text,
      type: 'sent',
      image
    };

    chat.messages.push(newMessage);
    await chat.save();

    // Simulate sending the message to the third-party API server
    const apiPayload = {
      message: text,
      image: image ? `http://localhost:5000${image}` : ''
    };

    const apiResponse = await fetch('http://third.server/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiPayload)
    });

    const apiData = await apiResponse.json();

    const responseMessage = {
      text: apiData.message,
      type: 'received'
    };

    chat.messages.push(responseMessage);
    await chat.save();

    res.json(apiData);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};
