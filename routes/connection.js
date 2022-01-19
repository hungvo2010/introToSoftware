const express = require('express');

const router = express.Router();
const connectionController = require('../controllers/connection');
const verifyToken = require('../middleware/verifyToken');

// Report some user
router.post('/connection/report', verifyToken, connectionController.reportUser);

// Volunteer offer help
router.post('/connection/help', verifyToken, connectionController.offerHelp);

// User post new message
router.post('/connection/chat', verifyToken, connectionController.postNewMessage);

// User load the message
router.get('/connection/chat', verifyToken, connectionController.getMessage);

// Handicapped post new feedback
router.post('/connection/feedback', verifyToken, connectionController.postFeedback);

// Handicapped update feedback
router.post('/connection/feedback/update', verifyToken, connectionController.updateFeedback);

// Handicapped agree help
router.post('/connection/agree', verifyToken, connectionController.agreeHelp);

module.exports = router;