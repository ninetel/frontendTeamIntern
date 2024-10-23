const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Staff = require("../models/Staff"); 
const User = require("../models/User"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" }, // Admin role is specifically assigned
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error("Login error:", error); // Added more specific error log message
    res.status(500).json({ error: "Error logging in" });
  }
});

router.post("/staff/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const staff = await Staff.findOne({ email });

    if (!staff) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, staff.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { id: staff._id, email: staff.email, role: "staff" }, // Role: staff
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error("Login error:", error); 
    res.status(500).json({ error: "Error logging in" });
  }
});

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

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  };
};

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
      const hashedPassword = await bcrypt.hash(password, 10);

      const newStaff = new Staff({ email, password: hashedPassword });
      await newStaff.save();

      res.status(201).json({ message: "Staff member added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error adding staff member" });
    }
  }
);

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

      await newUserInstance.save();
      await User.deleteOne({ email });

      res.status(200).json({ message: "User role updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error updating user role" });
    }
  }
);

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

router.get(
  "/admin/info",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const admin = await Admin.findById(req.user.id).select("-password"); 

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
