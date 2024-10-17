const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Staff = require("../models/Staff"); // Adjust the path as necessary
require('dotenv').config({ path: '../.env' });  // Adjust the path as necessary

const staffData = [
  {
    firstName: "John",
    lastName: "Doe",
    middleName: "A",
    address: "123 Main St",
    phoneNumber: "1234567890",
    emergencyContactName: "Jane Doe",
    emergencyContactNumber: "0987654321",
    gender: "Male",
    email: "john.doe@example.com",
    ecRelationShip: "Wife",
    password: "password123",
  },
  {
    firstName: "Alice",
    lastName: "Smith",
    middleName: "B",
    address: "456 Oak St",
    phoneNumber: "9876543210",
    emergencyContactName: "Bob Smith",
    emergencyContactNumber: "0123456789",
    gender: "Female",
    email: "alice.smith@example.com",
    ecRelationShip: "Brother",
    password: "password123",
  },
];

/*
{
    "firstName": "Alice",
    "lastName": "Smith",
    "middleName": "B",
    "address": "456 Oak St",
    "phoneNumber": "9876543210",
    "emergencyContactName": "Bob Smith",
    "emergencyContactNumber": "0123456789",
    "gender": "Female",
    "personalEmail": "alice.smith@example.com",
    "ecRelationShip": "Brother",
    "password": "password123"
}

*/

const seedStaffs = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    // console.log('process.env', process.env)
    // console.log("process.env", process.env.MONGO_URI);
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("Connected to MongoDB");

    // Delete existing staffs to avoid duplicates
    await Staff.deleteMany({});

    // Insert new staff data with hashed passwords
    const salt = await bcrypt.genSalt(10);
    for (const staff of staffData) {
      staff.password = await bcrypt.hash(staff.password, salt); // Hashing the password before saving
      const newStaff = new Staff(staff);
      await newStaff.save();
    }

    // console.log("Staffs seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding staffs:", error);
    mongoose.disconnect();
  }
};

seedStaffs();
