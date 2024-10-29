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
const moment = require('moment-timezone');

const mongoose = require('mongoose');
const UserStaffAssignment = require('../models/UserStaffAssignment');
// router.get('/api/chat/last-messages', chatController.getLastMessages);
const Chat = require('../models/Chat'); // Adjust the path as needed
const GeneralChat = require('../models/GeneralChat'); // Assuming you have a GeneralChat model
const Staff = require('../models/Staff'); // Ensure the correct path
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
  // Endpoint to assign a user to a staff member
 
//post
router.post('/assign-user-to-staff', async (req, res) => {
  const { userId, staffId } = req.body;
  try {
    // Check if the user assignment already exists
    const existingAssignment = await UserStaffAssignment.findOne({ userId });

    if (existingAssignment) {
      // If it exists, just update the staffId
      existingAssignment.staffId = staffId;
      await existingAssignment.save();
      res.status(200).send('User staff assignment updated successfully');
    } else {
      // If it does not exist, create a new assignment
      const newAssignment = new UserStaffAssignment({ userId, staffId });
      await newAssignment.save();
      res.status(201).send('User assigned to staff successfully');
    }
  } catch (error) {
    res.status(500).send('Error assigning user to staff: ' + error.message);
  }
});

// Update staff assignment for a user
router.put('/assignment/:userId', async (req, res) => {
  try {
    const { staffId } = req.body;
    let assignment = await UserStaffAssignment.findOne({ userId: req.params.userId });

    if (assignment) {
      assignment.staffId = staffId;
      await assignment.save();
      res.status(200).json({ message: 'Assignment updated successfully', assignment });
    } else {
      assignment = new UserStaffAssignment({ userId: req.params.userId, staffId });
      await assignment.save();
      res.status(201).json({ message: 'Assignment created successfully', assignment });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get staff assignment for a user
router.get('/assignment/:userId', async (req, res) => {
  try {
    const assignment = await UserStaffAssignment.findOne({ userId: req.params.userId }).populate('staffId', 'name');
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Endpoint to fetch messages for a staff member
router.get('/staff-messages/:staffId', async (req, res) => {
  const { staffId } = req.params;
  try {
    // Get user IDs assigned to the staff member
    const assignments = await UserStaffAssignment.find({ staffId });
    const userIds = assignments.map(assignment => assignment.userId);

    // Fetch messages for those user IDs
    const messages = await messages.find({ userId: { $in: userIds } }).sort({ time: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send('Error fetching messages for staff');
  }
});

// router.get('/by-user/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const assignment = await UserStaffAssignment.findOne({ userId });
//     if (userStaffAssignment && userStaffAssignment.staffId) {
//       const staff = await Staff.findById(userStaffAssignment.staffId);
//       if (staff) {
//         res.json(staff);
//       } else {
//         res.status(404).json({ message: 'Staff not found' });
//       }
//     } else {
//       res.status(200).json({ message: 'None' });
//     }
//   } catch (error) {
//     console.error('Error fetching staff details:', error);
//     res.status(500).json({ message: 'Error fetching staff details', error });
//   }
// });
router.get('/by-user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const assignment = await UserStaffAssignment.findOne({ userId });
    if (assignment && assignment.staffId) {
      res.json({ staff: assignment.staffId });
    } else {
      res.status(200).json({ message: 'None' });
    }
  } catch (error) {
    console.error('Error fetching staff details:', error);
    res.status(500).json({ message: 'Error fetching staff details', error });
  }
});



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

  // Route to get the last message of each general user in the provided uid array
router.post('/last-messages/general/selecteduid', async (req, res) => {
  const { uids } = req.body; // Expecting an array of uids in the request body

  if (!uids || !Array.isArray(uids) || uids.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing UID array' });
  }

  try {
    const lastMessages = await Promise.all(
      uids.map(async (uid) => {
        const lastMessage = await GeneralChat.findOne({ uid })
          .sort({ timestamp: -1 }) // Sort by timestamp in descending order
          .limit(1); // Take the last (most recent) message
          console.log("lastMessage")
          console.log(lastMessage)
          console.log("lastMessage")
          return {
          uid,
          message: lastMessage ? lastMessage.message : 'No message found', // Assuming 'content' holds the message text
          timestamp:lastMessage ? lastMessage.timestamp : 'NaN',
        };
      })
    );

    res.json({ lastMessages });
  } catch (error) {
    console.error('Error fetching last messages:', error);
    res.status(500).json({ error: 'Error fetching last messages' });
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


// Get guest chat messages for a given user ID
router.get('/guest-messages/:userId', async (req, res) => {
  try {
      const { userId } = req.params;

      // Check if userId is a valid ObjectId
      const isObjectId = mongoose.isValidObjectId(userId);
      
      let userDetails;

      // If it's a valid ObjectId, search by ObjectId; otherwise, search by UUID
      if (isObjectId) {
          userDetails = await User.findById(userId);
      } else {
          userDetails = await User.findOne({ uid: userId }); // Assuming 'uuid' is the field name for UUIDs
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

      // Combine all messages
      const allMessages = [...userMessages, ...generalUserMessages];

      // Respond with messages and user information
      res.json({ allMessages, userNameAndNumber });
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: err.message });
  }
});


router.post('/send-message', async (req, res) => {
  console.log(req.body); // Log the incoming request body

  const { sender, sender_id, message, image, type, timestamp, url, uid, receiver_id } = req.body;
  console.log("Received timestamp:", timestamp);
  
  try {
    // let newTimestamp;
    // if (timestamp) {
    //   // Add 5:45 to the provided timestamp to convert it to 'Asia/Kathmandu' timezone
    //   newTimestamp = moment(timestamp).add(5, 'hours').add(45, 'minutes').toDate();
    //   console.log("Converted timestamp to 'Asia/Kathmandu':", newTimestamp);
    // } else {
    //   // If no timestamp is provided, use the current time in 'Asia/Kathmandu' timezone
    //   newTimestamp = moment().add(5, 'hours').add(45, 'minutes').toDate();
    //   console.log("Defaulting to current 'Asia/Kathmandu' time:", newTimestamp);
    // }

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
        timestamp
      });
      await newMessage.save();
      return res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } else {
      console.log("zebra");

      let newMessage = new GeneralChat({
        sender,
        sender_id,
        message,
        image,
        type,
        url,
        uid,
        timestamp, // Convert timestamp here
        receiver_id,
      });

      console.log("Prepared newMessage:", newMessage);
      await newMessage.save();
      return res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    }
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
