// const express = require('express');
// const { sendMessage, uploadImage, uploadImageHandler } = require('../controllers/chatControllers');

// const router = express.Router();

// router.post('/send_message', sendMessage);
// router.post('/upload_image', uploadImage, uploadImageHandler);

// module.exports = router;
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatControllers'); // Adjust the path as necessary
// router.get('/api/chat/urls', chatController.getUrls);
const User = require("../models/User");
const mongoose = require('mongoose');

// router.get('/api/chat/last-messages', chatController.getLastMessages);
const Chat = require('../models/Chat'); // Adjust the path as needed
const GeneralChat = require('../models/GeneralChat'); // Assuming you have a GeneralChat model

// Get last message for each unique user from chat schema
// router.get('/last-messages/chat', async (req, res) => {
//     try {
//       const chatData = await Chat.aggregate([
//         { $sort: { timestamp: -1 } },
//         {
//           $group: {
//             _id: "$uid",
//             lastMessage: { $first: "$$ROOT" }
//           }
//         }
//       ]);
//       console.log('Chat Data:', chatData); // Add this line to log data
//       res.json(chatData);
//     } catch (err) {
//       console.error('Error:', err); // Add this line to log errors
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   // Get last message for each unique user from generalchats schema
//   router.get('/last-messages/general', async (req, res) => {
//     try {
//       const generalChatData = await GeneralChat.aggregate([
//         { $sort: { timestamp: -1 } },
//         {
//           $group: {
//             _id: "$uid",
//             lastMessage: { $first: "$$ROOT" }
//           }
//         }
//       ]);
//       console.log('General Chat Data:', generalChatData); // Add this line to log data
//       res.json(generalChatData);
//     } catch (err) {
//       console.error('Error:', err); // Add this line to log errors
//       res.status(500).json({ message: err.message });
//     }
//   });
  // Get last message for each unique user from chat schema
router.get('/last-messages/chat', async (req, res) => {
    try {
      const { url } = req.query; // Get the selectedUrl from the request parameters
  
      const chatData = await Chat.aggregate([
        { $match: { url: url } }, // Filter by the selected URL
        { $sort: { timestamp: -1 } },
        {
          $group: {
            _id: "$uid",
            lastMessage: { $first: "$$ROOT" }
          }
        }
      ]);
  
      console.log('Chat Data:', chatData); // Log the data
      res.json(chatData);
    } catch (err) {
      console.error('Error:', err); // Log errors
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get last message for each unique user from generalchats schema
  router.get('/last-messages/general', async (req, res) => {
    try {
      const { url } = req.query; // Get the selectedUrl from the request parameters
  
      const generalChatData = await GeneralChat.aggregate([
        { $match: { url: url } }, // Filter by the selected URL
        { $sort: { timestamp: -1 } },
        {
          $group: {
            _id: "$uid",
            lastMessage: { $first: "$$ROOT" }
          }
        }
      ]);
  
      console.log('General Chat Data:', generalChatData); // Log the data
      res.json(generalChatData);
    } catch (err) {
      console.error('Error:', err); // Log errors
      res.status(500).json({ message: err.message });
    }
  });
//   router.get('/messages/:userId', async (req, res) => {
//     try {
//       const { userId } = req.params;
  
//       // Fetch messages from Chat collection
//       const userMessages = await Chat.find({ uid: userId }).sort({ timestamp: 1 });
//       // Fetch messages from GeneralChat collection
//       const generalUserMessages = await GeneralChat.find({ uid: userId }).sort({ timestamp: 1 });
  
//       // Combine messages from both collections
//       const allMessages = [...userMessages, ...generalUserMessages];
  
//       // Sort all messages by timestamp
//       allMessages.sort((a, b) => a.timestamp - b.timestamp);
  
//       // Return all messages as an array
//       res.json(allMessages);
//     } catch (err) {
//       console.error('Error:', err);
//       res.status(500).json({ message: err.message });
//     }
//   });
  
  
// router.get("/urls", async (req, res) => {
//     console.log("Fetching all unique URLs...");
//     try {
//         const uniqueUrls = await Chat.distinct('url');
//         console.log("Fetched unique URLs:", uniqueUrls);
//         res.json(uniqueUrls);
//     } catch (err) {
//         console.error("Error fetching unique URLs:", err.message);
//         res.status(500).json({ error: "Failed to fetch unique URLs" });
//     }
// });
router.get('/messages/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Check if userId is a valid ObjectId
      const isObjectId = mongoose.isValidObjectId(userId);
      
      let userDetails;
  
      // If it's a valid ObjectId, search by ObjectId; otherwise, search by UUID
      if (isObjectId) {
        userDetails = await User.findById(userId);
      } else {
        userDetails = await User.findOne({ uuid: userId }); // Assuming 'uuid' is the field name for UUIDs
      }
  
      let userNameAndNumber = "Guest"; // Default value
      if (userDetails) {
        userNameAndNumber = userDetails.name && userDetails.phoneNumber
          ? `${userDetails.name} - ${userDetails.phoneNumber}`
          : userDetails._id; // Show ObjectId if name or phone is missing
      }
  
      // Fetch messages (adjust as necessary)
      const userMessages = await Chat.find({ uid: userId }).sort({ timestamp: 1 });
      const generalUserMessages = await GeneralChat.find({ uid: userId }).sort({ timestamp: 1 });
      const allMessages = [...userMessages, ...generalUserMessages];
  
      res.json({ allMessages, userNameAndNumber });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: err.message });
    }
  });
  
router.post('/send-message', async (req, res) => {
    console.log(req.body); // Log the incoming request body

    const { sender, sender_id, message, image, type, url,uid, receiver_id } = req.body;
  
    try {
    //   let newMessage;
  
      if (type === "auth users") {
        let newMessage = new Chat({
          sender,
          sender_id,
          message,
          image,
          type,
          url,
          uid,
          receiver_id,
        });
        await newMessage.save();
        return res.status(201).json({ message: 'Message sent successfully', data: newMessage });
      } else {
        let newMessage = new GeneralChat({
          sender,
          sender_id,
          message,
          image,
          type,
          url,
          uid,
          receiver_id,
        });
        await newMessage.save();
        return res.status(201).json({ message: 'Message sent successfully', data: newMessage });
      }
  
    //   await newMessage.save();
      
    } catch (error) {
      console.error('Error saving message:', error);
      return res.status(500).json({ message: 'Error sending message', error: error.message });
    }
  });
  
  
router.get("/urls", async (req, res) => {
    console.log("Fetching all unique URLs...");
    try {
        const [chatUrls, chatGeneralUrls] = await Promise.all([
            Chat.distinct('url'),
            GeneralChat.distinct('url')
        ]);

        // Combine and deduplicate URLs
        const uniqueUrls = Array.from(new Set([...chatUrls, ...chatGeneralUrls]));

        console.log("Fetched unique URLs:", uniqueUrls);
        res.json(uniqueUrls);
    } catch (err) {
        console.error("Error fetching unique URLs:", err.message);
        res.status(500).json({ error: "Failed to fetch unique URLs" });
    }
});

  
module.exports = router;
