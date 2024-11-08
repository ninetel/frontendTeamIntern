const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
const helmet = require('helmet');
require("dotenv").config();

// Import route modules
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes");
const promptRoutes = require("./routes/promptRoutes");
const signalRoutes = require("./routes/signalRoutes");
const contactRoutes = require("./routes/contactRoutes");
const chatRoutes = require('./routes/chatRoutes');
const urlRoutes = require("./routes/urlRoutes"); // Adjust the path to your urlRoutes file
const userStaffAssignmentRoutes = require("./routes/userStaffAssignmentRoutes"); // Adjust the path to your urlRoutes file
const categoryRoutes = require("./routes/categoryRoutes")
const contentRoutes = require("./routes/contentRoutes")
const predefinedQuestionsRoutes =require('./routes/predefinedQuestions')
// Import middleware
// const checkReferrer = require('./middleware/checkReferrer');

const app = express();

// Configure CORS to allow specific origins
app.use(cors({
  origin: [
    'http://localhost:3004',
    'http://localhost:3000',
    'http://localhost:3005',
    'http://localhost:5173',
    'http://81.181.198.75:5000/',
    'http://chatwidgetadmin.nepsetrends.com',
    'http://chatwidget.nepsetrends.com',
    'https://chatwidgetadmin.nepsetrends.com',
    'https://chatwidget.nepsetrends.com' // Add your deployed backend URL here

  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use helmet for security headers
app.use(helmet());

// Set Content-Security-Policy to control iframe embedding
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self' http://localhost:3004 http://localhost:3005 http://chatwidgetadmin.nepsetrends.com");
  next();
});

// Apply middleware to specific routes
// app.use('/api/chat', checkReferrer, chatRoutes);
app.use('/api/chat', chatRoutes);

// Register other routes
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/user", userRoutes);
app.use("/api/signal", signalRoutes);
app.use("/api/prompt", promptRoutes);
app.use("/api/urls", urlRoutes);
app.use("/api/usar", userStaffAssignmentRoutes);
app.use("/api/categories",categoryRoutes)
app.use("/api/contents",contentRoutes)
app.use('/api/predefinedQuestions', predefinedQuestionsRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
