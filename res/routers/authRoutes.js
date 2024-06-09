const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Login route
router.post('/login', authMiddleware.authenticateUser);

module.exports = router;
