// index.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes"); // Import staff routes
const promptRoutes = require("./routes/promptRoutes");
const signalRoutes = require("./routes/signalRoutes");
const contactRoutes = require("./routes/contactRoutes");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Configure CORS to allow specific origin
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5000'], // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes); // Use staff routes
app.use("/api/user", userRoutes);
app.use("/sikinchaa", signalRoutes);
app.use("/sikinchaa", promptRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000"); // Fixed logging message
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
