const jwt = require('jsonwebtoken');
const User = require('../models/userInfo');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the actual secret from environment variables
    const user = await User.findOne({ _id: decoded.user.id }); // Adjusted to match the structure of decoded token

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
