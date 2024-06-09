const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
  type: {
    type: String,
    required: true,
    enum: ['like', 'comment']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  seen: {
    type: Boolean,
    default: false
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
