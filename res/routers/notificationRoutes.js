const express = require('express');
const router = express.Router();
const { getNotifications, markAsSeen } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/decodeMiddleware');

router.get('/notifications', authMiddleware, getNotifications);
router.patch('/notifications/:notificationId', authMiddleware, markAsSeen);

module.exports = router;
