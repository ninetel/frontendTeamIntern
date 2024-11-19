const mongoose = require("mongoose");
const Admin = require("../models/Admin"); // Adjust the path as necessary
require("dotenv").config();

const adminData = [
  {
    name: "Admin Two",
    email: "ad2@example.com",
    password: "admin2",
    role: "admin",
    phoneNumber: "123-456-7891",
  },
  {
    name: "Admin Three",
    email: "ad3@example.com",
    password: "admin3",
    role: "admin",
    phoneNumber: "123-456-7892",
  },
  {
    name: "Admin Four",
    email: "Anil@gmail.com",
    password: "Itc123",
    role: "admin",
    phoneNumber: "123-456-7892",
  },
];

// const adminData = [
//   {
//     name: 'Admin One',
//     email: 'admin1@example.com',
//     password: 'adminpassword1', // In a real application, use a secure password
//     phoneNumber: '123-456-7890',
//     role: "admin",
//   },
//   {
//     name: 'Admin Two',
//     email: 'admin2@example.com',
//     password: 'adminpassword2',
//     role: "admin",
//     phoneNumber: '123-456-7891'
//   },
//   {
//     name: 'Admin Three',
//     email: 'admin3@example.com',
//     password: 'adminpassword3',
//     role: "admin",
//     phoneNumber: '123-456-7892'
//   }
// ];

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("Connected to MongoDB");

    // Delete existing admins to avoid duplicates
    await Admin.deleteMany({});

    // Insert new admin data
    for (const admin of adminData) {
      const newAdmin = new Admin(admin);
      await newAdmin.save();
    }

    // console.log("Admins seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding admins:", error);
    mongoose.disconnect();
  }
};

seedAdmins();
