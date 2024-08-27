const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: "Error logging in staff" });
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

// Route to create a new staff
router.post(
  "/create",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
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
    // Additional check for email
    if (!email || typeof email !== "string") {
      // console.log("personalEmail", personalEmail);
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
      // console.log("All field not filled");
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    try {
      console.log("req.body", req.body);
      const existingStaff = await Staff.findOne({ email });
      if (existingStaff) {
        // console.log("Email Already exists.");
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
      // console.log("Final error", error);
      res.status(500).json({ error: "Error creating staff lasttt ko maa" });
    }
  }
);



module.exports = router;
