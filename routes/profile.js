const express = require('express');

const router = express.Router();
const profileController = require('../controllers/profile');
const verifyToken = require('../middleware/verifyToken');

// Watch profile
router.get('/profile/:userId', verifyToken, profileController.getProfile);

// Update profile
router.post('/profile', verifyToken, profileController.updateProfile);

// Change mode
router.post('/profile/mode', verifyToken, profileController.changeMode);

module.exports = router;