// const multer = require('multer');
// const path = require('path');

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// const uploadFile = (req, res, next) => {
//   const uploadSingle = upload.single('file');

//   uploadSingle(req, res, (err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to upload file' });
//     }
//     req.filePath = req.file.path; // Store the file path in the request object
//     next(); // Call the next middleware/route handler
//   });
// };

// module.exports = uploadFile;
// routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Save in 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid overwriting
    }
  });

const upload = multer({ storage: storage });

// Endpoint to upload a file
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        res.status(200).json({ message: 'File uploaded successfully!', file: file });
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

// Endpoint to retrieve all files
router.get('/files', (req, res) => {
    const directoryPath = path.join(__dirname, '../uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan files' });
        }
        const fileInfos = files.map(file => {
            return {
                name: file,
                url: `/api/files/download/${file}`
            };
        });
        res.status(200).json(fileInfos);
    });
});

// Endpoint to serve the file data
router.get('/download/:name', (req, res) => {
    const fileName = req.params.name;
    const directoryPath = path.join(__dirname, '../uploads');
    res.download(path.join(directoryPath, fileName), fileName, err => {
        if (err) {
            res.status(500).json({ error: 'Could not download the file.' });
        }
    });
});

module.exports = router;
