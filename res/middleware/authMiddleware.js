

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userInfo');

exports.authenticateUser = async (req, res, next) => {
  try {
 
    console.log('Starting authentication process');

    // Extract email, password, and role from request body
    const { email, password, role } = req.body;
    console.log('Request body:', { email, role });

    // Find user by email
    const user = await User.findOne({ email });
    console.log('User found:', user ? true : false);

    // Check if user exists
    if (!user) {
      console.log('Invalid credentials: User not found');
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Invalid credentials: Incorrect password');
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Check if roles match
    if (user.role !== role) {
      console.log('Invalid role: Expected role does not match user role');
      return res.status(401).json({ msg: 'Invalid role' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        console.error('Error generating token:', err.message);
        throw err;
      }
      console.log('Token generated successfully');
      // Send token and role in response
      res.json({ token, role: user.role });
    
    });
    next();
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
};
