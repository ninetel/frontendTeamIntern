const express = require('express');
const { sendMessage, uploadImage, uploadImageHandler } = require('../controllers/chatControllers');

const router = express.Router();

router.post('/send_message', sendMessage);
router.post('/upload_image', uploadImage, uploadImageHandler);

module.exports = router;
