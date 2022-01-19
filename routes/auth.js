const express = require('express');

const router = express.Router();
const authControllers = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');

// Authentication using JWT so when logout client just delete the token

// POST /signup // Sign up new user
router.post('/signup', authControllers.postSignup);

// POST /signin // Sign in new user
router.post('/signin', authControllers.postSignin);

// POST /reset // Request to reset password if forgetting
router.post('/reset', authControllers.postReset);

// POST /new-password // Request to reset password after receiving token
router.post('/new-password', authControllers.postNewPassword); 

// POST /update-password // Change password
router.post('/update-password', verifyToken, authControllers.postUpdatePassword);

module.exports = router;