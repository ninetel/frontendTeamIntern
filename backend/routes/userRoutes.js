const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get the logged-in users's information
router.get(
  "/info",
  authenticateJWT,
  authorizeRole("user"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password"); // Use req.user.id

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      // console.log("Error in getting user info", error);
      res.status(500).json({ error: "Error fetching user info" });
    }
  }
);

//get one user info
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error fetching user", error });
  }
});

router.put("/responses/:userId", authenticateJWT, async (req, res) => {
  const { userId } = req.params;
  const { responses } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.responses = responses;
    user.hasAnsweredQuestions = true;

    await user.save();

    res.json({ message: "Responses updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating responses" });
  }
});

// POST a new user
router.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    hasAnsweredQuestions: false,
    responses: null,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    // console.log("user", user);

    if (!user) {
      return res.status(401).json({ error: "Invalid email oosor password" });
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);
    // console.log("password", password);
    // console.log("user.password", user.password);
    // console.log(match);

    if (!match) {
      return res.status(401).json({ error: "Invalid email orr password" });
    }

    // Create JWT token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // console.log("accessToken -----)))))>>>>", accessToken);

    res.json({ accessToken });
  } catch (error) {
    // console.log("Error in backend", error)
    res.status(500).json({ error: "Error logging in" });
  }
});

// app.use("/api/user", userRoutes);

// Update user responses
router.put("/responses/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const responses = req.body.responses;
    // console.log("inside the responses", req)

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // console.log("user", user)

    user.responses = responses;
    user.hasAnsweredQuestions = true;
    await user.save();

    res.status(200).send({ message: "Responses updated successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Error updating responses", error });
  }
});

module.exports = router;
