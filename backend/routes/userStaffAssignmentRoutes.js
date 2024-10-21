const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatControllers'); // Adjust the path as necessary
// router.get('/api/chat/urls', chatController.getUrls);
const User = require("../models/User");
const mongoose = require('mongoose');
const UserStaffAssignment = require('../models/UserStaffAssignment');

// router.get('/api/chat/last-messages', chatController.getLastMessages);
const Chat = require('../models/Chat'); // Adjust the path as needed
const GeneralChat = require('../models/GeneralChat'); // Assuming you have a GeneralChat model

// Route to get all userIds by staffId
router.get('/user/:staffId', async (req, res) => {
  const { staffId } = req.params;

  try {
    // Find all user staff assignments based on the provided staffId
    const assignments = await UserStaffAssignment.find({ staffId });

    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ error: 'No staff assignments found' });
    }

    // Extract userIds from the assignments
    const userIds = assignments.map(assignment => assignment.userId);

    // Return the list of userIds associated with the staffId
    res.json({ userIds });
  } catch (error) {
    console.error('Error fetching userIds:', error);
    res.status(500).json({ error: 'Error fetching userIds' });
  }
});
// Endpoint to get staff details by userId
router.get('/by-user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const userStaff = await userStaff.findOne({ userId });
      if (userStaff && userStaff.staffId) {
        const staff = await staff.findById(userStaff.staffId);
        if (staff) {
          res.json(staff);
        } else {
          res.status(404).json({ message: 'Staff not found' });
        }
      } else {
        res.status(200).json({ message: 'None' });
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
      res.status(500).json({ message: 'Error fetching staff details', error });
    }
  });
  
  
  module.exports = router;