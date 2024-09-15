// // index.js
// const express = require("express");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const userRoutes = require("./routes/userRoutes");
// const staffRoutes = require("./routes/staffRoutes"); // Import staff routes
// const promptRoutes = require("./routes/promptRoutes");
// const signalRoutes = require("./routes/signalRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const chatRoutes = require('./routes/chatRoutes');
// const path = require('path');  // Make sure to import the 'path' module

// const cors = require("cors");

// require("dotenv").config();

// const app = express();

// // Configure CORS to allow specific origin
// app.use(cors({
//   origin: ['http://localhost:5173','http://localhost:5000'], // Replace with your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Handle preflight requests
// app.options('*', cors());

// app.use(express.json());

// // Routes
// app.use("/api/contacts", contactRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/staff", staffRoutes); // Use staff routes
// app.use("/api/user", userRoutes);
// app.use("/sikinchaa", signalRoutes);
// app.use("/sikinchaa", promptRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/chat', chatRoutes);
// // Start server
// app.listen(3000, () => {
//   console.log("Server running on port 3000"); // Fixed logging message
// });

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));


// index.js
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

// Import middleware
const checkReferrer = require('./middleware/checkReferrer');

const app = express();

// Configure CORS
app.use(cors({
  origin: ['http://localhost:3004', 'http://localhost:3005'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use helmet for security headers
app.use(helmet());

// Set Content-Security-Policy to control iframe embedding
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self' http://localhost:3004 http://localhost:3005");
  next();
});

// Apply middleware to specific routes
app.use('/api/chat', checkReferrer, chatRoutes);

// Other routes
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/user", userRoutes);
app.use("/sikinchaa", signalRoutes);
app.use("/sikinchaa", promptRoutes);

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
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
