// index.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes"); // Import staff routes
const promptRoutes = require("./routes/promptRoutes");
const signalRoutes = require("./routes/signalRoutes");
const { authenticateJWT, requireRole } = require("./middleware/authMiddleWare");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());

// console.log("JWT_SECRET: in indexx", process.env.JWT_SECRET);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes); // Use staff routes
app.use("/api/user", userRoutes);
app.use("/sikinchaa", signalRoutes);
app.use("/sikinchaa", promptRoutes);

// Start server
app.listen(3000, () => {
  ("Server running on port 3000");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
