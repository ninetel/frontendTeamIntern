const express = require('express');
const router = express.Router();
const { adminLogin, staffLogin, userLogin, registerUser } = require('../controllers/authController');

router.post('/admin/login', adminLogin);

router.post('/staff/login', staffLogin);

router.post('/login', userLogin);

router.post('/register', registerUser);

module.exports = router;
