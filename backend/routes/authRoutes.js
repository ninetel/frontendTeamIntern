const express = require('express');
const router = express.Router();
const { adminLogin, staffLogin, userLogin, registerUser } = require('../controllers/authController');

// Admin login route
router.post('/admin/login', adminLogin);

// Staff login route
router.post('/staff/login', staffLogin);

// Common login route for normal users and clients
router.post('/login', userLogin);

// Common registration route for all user types
router.post('/register', registerUser);

module.exports = router;
