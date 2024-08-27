const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: false },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emergencyContactName: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  gender: { type: String, required: false },
  email: { type: String, required: true },
  ecRelationShip: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "staff",
    immutable: true,
  },
});

module.exports = mongoose.model("Staff", staffSchema);

// const Staff = mongoose.model("Staff", staffSchema);

// module.exports = Staff;
