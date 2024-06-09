const express = require('express');
const router = express.Router();
const { likePost, unlikePost } = require('../controllers/likeController');
const authMiddleware = require('../middleware/decodeMiddleware');

router.post('/like', authMiddleware, likePost);
router.post('/unlike', authMiddleware, unlikePost);

module.exports = router;
