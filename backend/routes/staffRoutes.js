const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
};
const authenticateJWT = (req, res, next) => {
  const accessToken =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (accessToken == null) {
    return res.status(401).json({ error: "No accessToken provided" });
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Access denied" });
    }
    req.user = user;
    next();
  });
};

async function fixEmails() {
  const staffs = await Staff.find({ email: null });

  for (const staff of staffs) {
    staff.email = "FixThisEmail@example.com"; // Or generate a unique placeholder
    await staff.save();
  }
}
// fixEmails();

// Middleware to authorize roles
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ error: "Access denied, unauthorized role" });
    }
    next();
  };
};

// Route for staff login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const staff = await Staff.findOne({ email: email });

    if (!staff) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const match = await bcrypt.compare(password, staff.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create JWT token
    const accessToken = jwt.sign(
      { id: staff._id, email: staff.email, role: "staff" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Store staff ID in session


    res.json({ accessToken });
  } catch (error) {
    console.error("Error logging in staff:", error);
    res.status(500).json({ error: "Error logging in staff" });
  }
});

// Route to get all staff members
router.get('/staff', async (req, res) => {
  try {
    const staffMembers = await Staff.find().select('-password'); // Fetch all staff members excluding passwords
    res.json(staffMembers);
  } catch (error) {
    console.error('Error fetching staff members:', error);
    res.status(500).json({ error: 'Error fetching staff members' });
  }
});

// Route to get the logged-in staff's ID without authentication
router.get('/id',  
  // authenticateJWT,
  // authorizeRole("staff"),
  
  async (req, res) => {
  try {
    const staffId = 0;

    console.log('Staff ID:', staffId);
    if (!staffId) {
      console.error("User ID not found in request.");
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    const staffInfo = await Staff.findById(staffId);

    console.log('Fetched Staff Info:', staffInfo);

    if (!staffInfo) {
      console.error("Staff not found for ID:", staffId);
      return res.status(404).json({ message: 'Staff not found' });
    }

    const id = staffInfo._id.toString(); // Convert ObjectId to string
    res.status(200).json({ id }); // Return the ID in a JSON response
  } catch (error) {
    console.error('Error fetching staff ID:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Route to get the logged-in staff's information
router.get(
  "/info",
  authenticateJWT,
  authorizeRole("staff"),
  //later add admin as well
  async (req, res) => {
    try {
      const staff = await Staff.findById(req.user.id).select("-password");

      if (!staff) {
        return res.status(404).json({ error: "Staff not found" });
      }
      res.json(staff);
    } catch (error) {
      res.status(500).json({ error: "Error fetching staff info" });
    }
  }
);
// Route to get the logged-in staff's information without jwt
router.get(
  "/infos",
  // authenticateJWT,
  // authorizeRole("staff"),
  // later add admin as well
  async (req, res) => {
    // For testing purposes, set req.user manually if needed
    req.user = { id: "someValidStaffId" }; // Replace with a valid staff ID from your database
    
    try {
      console.log(req.user); // Log the user object
      const staff = await Staff.findById(req.user.id).select("-password");

      if (!staff) {
        return res.status(404).json({ error: "Staff not found" });
      }
      res.json(staff);
    } catch (error) {
      console.error("Error fetching staff info:", error); // Log the actual error
      res.status(500).json({ error: "Error fetching staff info" });
    }
  }
);

// Route to create a new staff
router.post("/create", async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    address,
    phoneNumber,
    emergencyContactName,
    emergencyContactNumber,
    gender,
    email,
    ecRelationShip,
    password,
    role,
  } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (
    !firstName ||
    !lastName ||
    !address ||
    !phoneNumber ||
    !middleName ||
    !emergencyContactName ||
    !emergencyContactNumber ||
    !email ||
    !ecRelationShip ||
    !password ||
    !role
  ) {
    return res.status(400).json({ error: "All required fields must be filled" });
  }

  try {
    console.log("req.body", req.body);
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = new Staff({
      firstName,
      lastName,
      middleName,
      address,
      phoneNumber,
      emergencyContactName,
      emergencyContactNumber,
      gender,
      email,
      ecRelationShip,
      password: hashedPassword,
      role: role,
    });

    await newStaff.save();
    res.status(201).json({ message: "Staff created successfully" });
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({ error: "Error creating staff" });
  }
});

module.exports = router;
