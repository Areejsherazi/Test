const Notification = require('../models/notification');

const getNotifications = async (req, res) => {
  const userId = req.user._id;

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const markAsSeen = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.seen = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as seen' });
  } catch (error) {
    console.error('Error marking notification as seen:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getNotifications, markAsSeen };
