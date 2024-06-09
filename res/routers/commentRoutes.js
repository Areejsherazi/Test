const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/decodeMiddleware');

router.post('/comment', authMiddleware, addComment);
router.get('/comments/:postId', getComments);

module.exports = router;
