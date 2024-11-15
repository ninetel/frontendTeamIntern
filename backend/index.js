const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
const helmet = require('helmet');
require("dotenv").config();
const multer = require('multer');
const fs = require('fs');
// const bodyParser = require('body-parser');
const formidable = require('formidable');

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
const fileUpdloadRoutes =require('./routes/fileUpdloadRoutes')
// Import middleware
// const checkReferrer = require('./middleware/checkReferrer');
const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

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
app.use(bodyParser.json({ limit: '50mb' })); app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000000000 }));

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
app.use('/api/fileUpdloadRoutes', fileUpdloadRoutes);

// Configure multer for file uploads
 
 
// Set up multer storage engine to save files in 'uploads' folder
// Set up multer to save files in the 'uploads' directory
// Multer storage configuration


// Configure storage for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = './uploads';
//     // Check if 'uploads' directory exists, if not create it
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }
//     cb(null, dir); // Set destination folder for uploaded files
//   },
//   filename: (req, file, cb) => {
//     // Set file name to be the current timestamp + original file name
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // File filter to allow only image files
// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const mimetype = filetypes.test(file.mimetype);
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimetype && extname) {
//     return cb(null, true);
//   }
//   cb(new Error('Only image files are allowed!'), false);
// };

// // Create multer upload middleware using the storage configuration and file filter
// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter
// });

// // Route to handle file upload
// app.post('/api/upload', upload.single('file'), (req, res) => {
//   console.log("req.file")
//   console.log(req.file)
//   // Check if a file is uploaded
//   if (!req.file) {
//     return res.status(400).send('No file uploaded');
//   }
  
//   // Return the file path for the uploaded file
//   const filePath = `/uploads/${req.file.filename}`;
//   res.json({ imageUrl: filePath }); // Send file path back to frontend
// });
// app.post('/api/upload', (req, res) => {
//   try {
//     const { message } = req.body;
//     const file = req.files?.file;

//     if (!file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const dir = './uploads';
//     // Check if 'uploads' directory exists, if not create it
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }

//     const filename = `${Date.now()}-${file.name}`;
//     const filePath = path.join(dir, filename);

//     // Convert ArrayBuffer to Buffer
//     const buffer = Buffer.from(new Uint8Array(file.data));
//     fs.writeFileSync(filePath, buffer);

//     res.json({ imageUrl: `/uploads/${filename}` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// });
// app.post('/api/upload', (req, res) => {
//   console.log("formDta")

//   const form = new formidable.IncomingForm({ multiples: true });
//   form.uploadDir = './uploads';
  
//   // Ensure the upload directory exists
//   if (!fs.existsSync(form.uploadDir)) {
//     fs.mkdirSync(form.uploadDir);
//   }

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({ error: 'Error parsing the files' });
//     }
    
//     if (!files.file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const file = files.file;
//     const oldPath = file.path;
//     const newPath = path.join(form.uploadDir, Date.now() + '-' + file.name);

//     fs.rename(oldPath, newPath, (err) => {
//       if (err) {
//         return res.status(500).send('Error saving the file');
//       }

//       res.json({ imageUrl: `/uploads/${path.basename(newPath)}` });
//     });
//   });
// });
// app.post('/api/upload', (req, res) => {
//   console.log("formData");
//   console.log(req);

//   const form = new formidable.IncomingForm({ multiples: true });
//   form.uploadDir = './uploads';
  
//   // Ensure the upload directory exists
//   if (!fs.existsSync(form.uploadDir)) {
//     fs.mkdirSync(form.uploadDir);
//   }

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({ error: 'Error parsing the files' });
//     }
    
//     if (!files.file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const file = files.file[0]; // If you are handling a single file, use `files.file[0]` for correct access
//     const oldPath = file.filepath;

//     const extname = path.extname(file.originalFilename);
//     console.log("ext");
//     console.log(file);

//     // Generate a unique filename based on current timestamp and random string
//     const uniqueSuffix = Date.now() + '_' + Math.floor(Math.random() * 900 + 100);
//     const newPath = path.join(form.uploadDir, uniqueSuffix + extname);

//     // Move the file to the new path
//     fs.rename(oldPath, newPath, (err) => {
//       if (err) {
//         return res.status(500).send('Error saving the file');
//       }

//       // Send back the path of the uploaded file
//       res.json({ imageUrl: `/uploads/${path.basename(newPath)}` });
//     });
//   });
// });
app.use(express.json({ limit: '50mb' })); // Adjust the limit to 50mb or your preferred size

app.post('/api/upload', (req, res) => {
  console.log("URL Param:", req); // Access URL parameter
  console.log("formData");
  // console.log(req);

  const form = new formidable.IncomingForm({ multiples: true });
  form.uploadDir = './uploads';
  
  // Ensure the upload directory exists
  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir);
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Error parsing the files' });
    }

    if (!files.file) {
      return res.status(400).send('No file uploaded');
    }

    const file = files.file[0]; // If you are handling a single file, use `files.file[0]` for correct access
    console.log("heyWSS"+files.file[0])
    const oldPath = file.filepath;
    console.log("heyWSwwS"+fields)

    // const extname = ".png";
    // Extract the extension from the uploaded file's name (which should have been generated by the frontend)
    // const fileName = file.originalFilename; // e.g., 'file-1635216434416.jpg'
    // const filename = fields.filename; // Extract the file extension from the name
    // console.log(filename)
    // const extension = path.extname(filename);

    // console.log("File extension:", req.files);
    const extname = path.extname(file.originalFilename);
    console.log("ext", extname);

    // Generate a unique filename based on current timestamp and random string
    const uniqueSuffix = Date.now() + '_' + Math.floor(Math.random() * 900 + 100);
    const newPath = path.join(form.uploadDir, uniqueSuffix + extname);  // Use the correct extension

    // Move the file to the new path
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        return res.status(500).send('Error saving the file');
      }

      // Send back the path of the uploaded file
      res.json({ imageUrl: `/uploads/${path.basename(newPath)}` });
    });
  });
});


// app.post('/api/upload', (req, res) => {
//   const { imageData } = req.body; // Base64 encoded image data

//   if (!imageData) {
//     return res.status(400).json({ message: "No image data received." });
//   }

//   // Decode the base64 string to binary
//   const buffer = Buffer.from(imageData, 'base64');

//   // Generate a file name and path to store the image
//   const filePath = path.join(__dirname, 'uploads', 'image.png'); // You can dynamically set the file name here

//   // Write the binary data to a file
//   fs.writeFile(filePath, buffer, (err) => {
//     if (err) {
//       console.error("Error saving the image:", err);
//       return res.status(500).json({ message: "Failed to save image." });
//     }

//     // Respond with a URL or a success message
//     res.json({ imageUrl: `${process.env.BASE_URL}/uploads/image.png` });
//   });
// });

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
