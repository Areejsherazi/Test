// const Like = require('../models/like');
// const authMiddleware = require('../middleware/decodeMiddleware');

// const likePost = async (req, res) => {
//   const { postId } = req.body;
//   const userId = req.user._id;

//   try {
//     console.log('Request to like post:', { postId, userId });

//     // Check if the post is already liked by this user
//     const existingLike = await Like.findOne({ postId, userId });
//     if (existingLike) {
//       console.log('Post already liked by this user');
//       return res.status(400).json({ message: 'You have already liked this post' });
//     }

//     const newLike = new Like({
//       postId,
//       userId,
//     });

//     await newLike.save();
//     console.log('Post liked successfully:', newLike);
//     res.status(201).json({ message: 'Post liked successfully', like: newLike });
//   } catch (error) {
//     console.error('Error liking post:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// const unlikePost = async (req, res) => {
//   const { postId } = req.body;
//   const userId = req.user._id;

//   try {
//     console.log('Request to unlike post:', { postId, userId });

//     const like = await Like.findOneAndDelete({ postId, userId });

//     if (!like) {
//       console.log('Like not found for this user and post');
//       return res.status(404).json({ message: 'Like not found' });
//     }

//     console.log('Post unliked successfully');
//     res.status(200).json({ message: 'Post unliked successfully' });
//   } catch (error) {
//     console.error('Error unliking post:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// module.exports = { likePost, unlikePost };

const Like = require('../models/like');
const Notification = require('../models/notification');
const Post = require('../models/postInfo');
const authMiddleware = require('../middleware/decodeMiddleware');

const likePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;

  try {
    console.log('Request to like post:', { postId, userId });

    // Check if the post is already liked by this user
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      console.log('Post already liked by this user');
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    const newLike = new Like({
      postId,
      userId,
    });

    await newLike.save();

    // Create a notification for the post owner
    const post = await Post.findById(postId);
    if (post.userId.toString() !== userId.toString()) {
      const notification = new Notification({
        userId: post.userId,
        postId,
        type: 'like',
      });
      await notification.save();
    }

    console.log('Post liked successfully:', newLike);
    res.status(201).json({ message: 'Post liked successfully', like: newLike });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const unlikePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;

  try {
    console.log('Request to unlike post:', { postId, userId });

    const like = await Like.findOneAndDelete({ postId, userId });

    if (!like) {
      console.log('Like not found for this user and post');
      return res.status(404).json({ message: 'Like not found' });
    }

    console.log('Post unliked successfully');
    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { likePost, unlikePost };
