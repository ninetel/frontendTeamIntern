const mongoose = require('mongoose');

const UserStaffAssignmentSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  staffId: { type: String, required: true }
});

const UserStaffAssignment = mongoose.model('UserStaffAssignment', UserStaffAssignmentSchema);

module.exports = UserStaffAssignment;
