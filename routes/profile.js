const express = require('express');

const router = express.Router();
const profileController = require('../controllers/profile');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../services/upload').upload;

// Watch profile
router.get('/profile/:userId', verifyToken, profileController.getProfile);

// Update profile
router.post('/profile/update', upload.single("photo"), verifyToken, profileController.updateProfile);

// Change mode
router.post('/profile/mode', verifyToken, profileController.changeMode);

module.exports = router;