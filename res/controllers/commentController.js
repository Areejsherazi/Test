// const Comment = require('../models/comment');

// const addComment = async (req, res) => {
//   const { postId, text } = req.body;
//   const userId = req.user._id;

//   try {
//     const newComment = new Comment({
//       postId,
//       userId,
//       text
//     });

//     await newComment.save();
//     console.log('Comment added successfully:', newComment);
//     res.status(201).json({ message: 'Comment added successfully', comment: newComment });
//   } catch (error) {
//     console.error('Error adding comment:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// const getComments = async (req, res) => {
//   const { postId } = req.params;

//   try {
//     const comments = await Comment.find({ postId }).populate('userId', 'name');
//     res.status(200).json(comments);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// module.exports = { addComment, getComments };

const Comment = require('../models/comment');
const Notification = require('../models/notification');
const Post = require('../models/postInfo');

const addComment = async (req, res) => {
  const { postId, text } = req.body;
  const userId = req.user._id;

  try {
    const newComment = new Comment({
      postId,
      userId,
      text
    });

    await newComment.save();

    // Create a notification for the post owner
    const post = await Post.findById(postId);
    if (post.userId.toString() !== userId.toString()) {
      const notification = new Notification({
        userId: post.userId,
        postId,
        type: 'comment',
      });
      await notification.save();
    }

    console.log('Comment added successfully:', newComment);
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).populate('userId', 'name');
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addComment, getComments };
