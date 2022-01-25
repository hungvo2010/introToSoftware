const express = require('express');

const router = express.Router();
const taskController = require('../controllers/task');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../services/upload').upload;

// Handicapped create new task
router.post('/task/create', upload.single("photo"), verifyToken, taskController.createTask);

// Handicapped update task information
router.post('/task/update', upload.single("photo"), verifyToken, taskController.updateTask);

// User get connection history
// router.get('/task/history', verifyToken, taskController.getConnectionHistory);

// Handicapped confirm already received Help
router.get('/task/help', verifyToken, taskController.confirmHelp);

// Volunteer filter the task
router.get('/task/filter', verifyToken, taskController.filterTask);

module.exports = router;