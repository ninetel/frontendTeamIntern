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


// POST route to assign staff to a user
router.post('/assign', async (req, res) => {
  const { uid, staffId } = req.body;

  if (!uid || !staffId) {
      return res.status(400).json({ message: 'UID and Staff ID are required' });
  }

  try {
      // Check if the assignment already exists
      const existingAssignment = await UserStaffAssignment.findOne({ uid });
      if (existingAssignment) {
          return res.status(409).json({ message: 'Assignment already exists for this UID' });
      }

      // Create new assignment
      const assignment = new UserStaffAssignment({ uid, staffId });
      await assignment.save();

      res.status(201).json({ message: 'Assignment created successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

 

// PUT route to update staffId for a given uid
router.put('/:uid', async (req, res) => {
  const { uid } = req.params;
  const { staffId } = req.body;

  // Validate the input
  if (!staffId) {
    return res.status(400).json({ message: 'staffId is required' });
  }

  try {
    // Find the UserStaffAssignment by uid and update the staffId
    const updatedAssignment = await UserStaffAssignment.findOneAndUpdate(
      { uid },
      { staffId },
      { new: true } // Return the updated document
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: 'UserStaffAssignment not found' });
    }

    res.status(200).json({ message: 'UserStaffAssignment updated successfully', data: updatedAssignment });
  } catch (error) {
    console.error("Error updating in database:", error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to get all userIds by staffId
router.get('/user/:staffId', async (req, res) => {
  const { staffId } = req.params;
  // console.log("jay shambho")
  // console.log(staffId)

  try {
    // console.log(staffId)
    // Find all user staff assignments based on the provided staffId
    const assignments = await UserStaffAssignment.find({ staffId });
    // console.log("assignments")
    // console.log(assignments)
    // console.log("assignments")
    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ error: 'No staff assignments found' });
    }

    // Extract userIds from the assignments
    const userIds = assignments.map(assignment => assignment.uid);
    // console.log("uidpp")
    // console.log(userIds)
    // console.log("uidpp")
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