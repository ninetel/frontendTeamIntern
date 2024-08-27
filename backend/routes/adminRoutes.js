const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin"); // Use Admin model for admins
const Staff = require("../models/Staff"); // Separate model for Staffs
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Route for admin login

router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create JWT token
    // const accessToken = jwt.sign(
    //   { email: admin.email, role: "admin" },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );
    // Create JWT token
    const accessToken = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ accessToken });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    res.status(500).json({ error: "Error logging in" });
  }
});

// Middleware to authenticate and authorize admin
const authenticateJWT = (req, res, next) => {
  const accessToken =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (accessToken) {
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Access denied" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "No accessToken provided" });
  }
};

// Middleware to authorize specific roles
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next(); // User has the required role, proceed
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  };
};

// Route to add staff (admin only)
router.post(
  "/add-staff",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user record with 'staff' role
      const newStaff = new Staff({ email, password: hashedPassword });
      await newStaff.save();

      res.status(201).json({ message: "Staff member added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error adding staff member" });
    }
  }
);

// Route to change user role (admin only)
router.put(
  "/change-role/:email",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    const { email } = req.params;
    const { newRole } = req.body;

    if (!newRole) {
      return res.status(400).json({ error: "New role is required" });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create the new role model instance
      let newUserInstance;
      if (newRole === "admin") {
        newUserInstance = new Admin({
          email: user.email,
          password: user.password,
        });
      } else if (newRole === "staff") {
        newUserInstance = new Staff({
          email: user.email,
          password: user.password,
        });
      } else {
        return res.status(400).json({ error: "Invalid role" });
      }

      // Save the new user instance to the appropriate collection
      await newUserInstance.save();

      // Delete the old user record
      await User.deleteOne({ email });

      res.status(200).json({ message: "User role updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error updating user role" });
    }
  }
);

// Route to get user info (for testing purposes)
router.get(
  "/users",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  }
);

// Route to get the logged-in admin's information
router.get(
  "/admin/info",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const admin = await Admin.findById(req.user.id).select("-password"); // Use req.user.id

      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: "Error fetching admin info" });
    }
  }
);

module.exports = router;
