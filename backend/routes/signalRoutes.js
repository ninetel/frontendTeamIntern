const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff");
const Signal = require("../models/Signal");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const authenticateJWT = (req, res, next) => {
  const accessToken = req.cookies.token;
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

//   try {
//     const jwtToken = req.cookies.token;
//     console.log("jwtToken", jwtToken);

//     if (!jwtToken) return res.status(401).json({ error: "user not authorized!" })

//     const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)

//     if(!decoded){
//         return res.status(401).json({ error: "Invalid!" })
//     }

//     // pass the data to requested route
//     req.user = decoded.user
//     next()
// } catch (error) {
//     res.status(401).json({ error: "Invalid token" })
// }
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

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dfh0g77dj",
  api_key: "794444963466384",
  api_secret: "rlDjXyTSoCI2kIU_8oP1w5pndDY",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "signals",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.filename,
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("signalImage"), (req, res) => {
  if (req.file) {
    res.json({ url: req.file.path });
  } else {
    res.status(400).json({ error: "Failed to upload image" });
  }
});

//route to post signals
router.post(
  "/create_signal",
  authenticateJWT,
  authorizeRoles("admin", "staff"),
  upload.single("signalImage"),
  async (req, res) => {
    const {
      createdDate,
      signalTitle,
      signalPlans,
      sector,
      scrips,
      signalType,
      suitableFor,
      openPrice,
      stopLoss,
      buyRange1,
      buyRange2,
      buyRange3,
      bookProfit1,
      bookProfit2,
      bookProfit3,
      timeFrame,
      signalImage,
      signalDescription,
      status,
    } = req.body;
    if (
      !signalTitle ||
      !signalPlans ||
      !sector ||
      !scrips ||
      !suitableFor ||
      !signalType ||
      !openPrice ||
      !stopLoss ||
      !buyRange1 ||
      !signalImage ||
      !signalDescription
    ) {
      // console.log("All field not filled");
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }
    try {
      const newSignal = new Signal({
        createdDate,
        signalTitle,
        signalPlans,
        sector,
        scrips,
        signalType,
        suitableFor,
        openPrice,
        stopLoss,
        buyRange1,
        buyRange2,
        buyRange3,
        bookProfit1,
        bookProfit2,
        bookProfit3,
        timeFrame,
        signalImage,
        signalDescription,
        status,
      });

      await newSignal.save();
      res.status(201).json({ message: "Signal created successfully" });
    } catch (error) {
      // console.log("Final error", error);
      res.status(500).json({ error: "Error creating signal " });
    }
  }
);
// Route to get all signals
router.get(
  "/signals",
  authenticateJWT,
  authorizeRoles("admin", "staff"),
  async (req, res) => {
    try {
      const signals = await Signal.find(); // Fetch all signals
      res.status(200).json(signals);
    } catch (error) {
      res.status(500).json({ error: "Error fetching signals" });
    }
  }
);

// Route to edit a signal by ID
router.put(
  "/edit_signal/:id",
  authenticateJWT,
  authorizeRoles("admin", "staff"),
  async (req, res) => {
    const { id } = req.params;
    const {
      createdDate,
      signalTitle,
      signalPlans,
      sector,
      scrips,
      signalType,
      suitableFor,
      openPrice,
      stopLoss,
      buyRange1,
      buyRange2,
      buyRange3,
      bookProfit1,
      bookProfit2,
      bookProfit3,
      timeFrame,
      signalImage,
      signalDescription,
      status,
    } = req.body;

    try {
      const updatedSignal = await Signal.findByIdAndUpdate(
        id,
        {
          createdDate,
          signalTitle,
          signalPlans,
          sector,
          scrips,
          signalType,
          suitableFor,
          openPrice,
          stopLoss,
          buyRange1,
          buyRange2,
          buyRange3,
          bookProfit1,
          bookProfit2,
          bookProfit3,
          timeFrame,
          signalImage,
          signalDescription,
          status,
        },
        { new: true }
      );

      if (!updatedSignal) {
        return res.status(404).json({ error: "Signal not found" });
      }

      res.json(updatedSignal);
    } catch (error) {
      res.status(500).json({ error: "Error updating signal" });
    }
  }
);

// Route to delete a signal by ID
router.delete(
  "/delete_signal/:id",
  authenticateJWT,
  authorizeRoles("admin", "staff"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const deletedSignal = await Signal.findByIdAndDelete(id);

      if (!deletedSignal) {
        return res.status(404).json({ error: "Signal not found" });
      }

      res.json({ message: "Signal deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting signal" });
    }
  }
);

// Route to get a single signal by ID
router.get(
  "/signal/:id",
  authenticateJWT,
  authorizeRoles("admin", "staff"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const signal = await Signal.findById(id);

      if (!signal) {
        return res.status(404).json({ error: "Signal not found" });
      }

      res.json(signal);
    } catch (error) {
      res.status(500).json({ error: "Error fetching signal" });
    }
  }
);

module.exports = router;
