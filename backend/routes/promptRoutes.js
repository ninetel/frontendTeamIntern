const express = require("express");
const Staff = require("../models/Staff");
const Prompt = require("../models/Prompt");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

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

// Middleware to authorize roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // console.log("req.uers.role", req.user.role);
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Access denied, unauthorized role" });
    }
    next();
  };
};

//route to post prompts
// ${import.meta.env.VITE_BACKEND_URL}/sikinchaa/create_prompt
router.post(
  "/create_prompt",
  authenticateJWT,
  authorizeRoles("admin", "staff"),
  async (req, res) => {
    // console.log("inside of create_prompt");
    // console.log("req", req);
    // console.log("req.body", req.body);
    const { createdDate, promptTitle, promptDescription, status } = req.body;
    if (!promptTitle || !status || !promptDescription) {
      // console.log("All field not filled");
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }
    try {
      const newprompt = new Prompt({
        createdDate,
        promptTitle,
        promptDescription,
        status,
      });

      await newprompt.save();
      res.status(201).json({ message: "prompt created successfully" });
    } catch (error) {
      // console.log("Final error", error);
      res.status(500).json({ error: "Error creating prompt " });
    }
  }
);
// Route to get all prompts
router.get(
  "/prompts",
  authenticateJWT,
  authorizeRoles("admin", "staff"),
  async (req, res) => {
    try {
      const prompts = await Prompt.find(); // Fetch all prompts
      // console.log("backend Prompts.find()", prompts)
      res.status(200).json(prompts);
    } catch (error) {
      // console.log("backend error Prompts.find()", error)
      res.status(500).json({ error: "Error fetching prompts" });
    }
  }
);

// Route to edit a prompt by ID
router.put(
  "/prompt/edit/:id",
  authenticateJWT,
  authorizeRoles("admin", "staff"),
  async (req, res) => {
    const { id } = req.params;
    const { createdDate, promptTitle, promptDescription, status } = req.body;

    try {
      const updatedPrompt = await Prompt.findByIdAndUpdate(
        id,
        {
          createdDate,
          promptTitle,
          promptDescription,
          status,
        },
        { new: true }
      );

      if (!updatedPrompt) {
        return res.status(404).json({ error: "prompt not found" });
      }

      res.json(updatedPrompt);
    } catch (error) {
      res.status(500).json({ error: "Error updating prompt" });
    }
  }
);

// Route to delete a prompt by ID
router.delete(
  "/prompt/delete/:id",
  authenticateJWT,
  authorizeRoles("admin", "staff"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const deletedPrompt = await Prompt.findByIdAndDelete(id);

      if (!deletedPrompt) {
        return res.status(404).json({ error: "prompt not found" });
      }

      res.json({ message: "prompt deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting prompt" });
    }
  }
);

// Route to get a single prompt by ID
router.get(
  "/prompt/:id",
  authenticateJWT,
  authorizeRoles("admin", "staff"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const prompt = await Prompt.findById(id);

      if (!prompt) {
        return res.status(404).json({ error: "prompt not found" });
      }

      res.json(prompt);
    } catch (error) {
      res.status(500).json({ error: "Error fetching prompt" });
    }
  }
);

module.exports = router;
