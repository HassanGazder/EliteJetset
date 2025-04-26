const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendRegistrationEmail, sendAdminRegistrationNotification } = require('../services/emailService');

// Middleware to verify user authentication
const verifyAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Register new user (becomes an agent)
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, registrationToken } = req.body;

    // Verify registration token
    if (!registrationToken) {
      return res.status(403).json({ message: 'Registration token required' });
    }

    try {
      const decoded = jwt.verify(registrationToken, process.env.JWT_SECRET);
      if (decoded.type !== 'registration' || decoded.email !== email) {
        return res.status(403).json({ message: 'Invalid registration token' });
      }
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired registration token' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate referral code
    const userReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Create new user (as an agent)
    const user = new User({
      firstName,
      lastName,
      email,
      username,
      password,
      role: 'agent', // Set role as agent
      referralCode: userReferralCode
    });

    // Save user
    await user.save();

    // Send welcome email to the user
    await sendRegistrationEmail(user.email, user.firstName);
    
    // Send notification to admin
    await sendAdminRegistrationNotification(user);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Agent registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: user.role,
        referralCode: user.referralCode
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering agent' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    console.log('Login attempt:', { emailOrUsername });

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername.toLowerCase() }
      ]
    });

    console.log('User found:', user ? 'Yes' : 'No');
    if (user) {
      console.log('User details:', {
        username: user.username,
        email: user.email,
        role: user.role
      });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: user.role,
        referralCode: user.referralCode
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Get agent's contact form link
router.get('/contact-form-link', verifyAuth, async (req, res) => {
  try {
    // Only agents can get contact form links
    if (req.user.role !== 'agent') {
      return res.status(403).json({ message: 'Only agents can access contact form links' });
    }

    // Generate a unique contact form link for the agent
    const contactFormLink = `${process.env.FRONTEND_URL}/contact?agent=${req.user.username}`;

    res.json({ contactFormLink });
  } catch (error) {
    console.error('Error generating contact form link:', error);
    res.status(500).json({ message: 'Error generating contact form link' });
  }
});

// Get user profile
router.get('/profile', verifyAuth, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      username: req.user.username,
      role: req.user.role,
      referralCode: req.user.referralCode
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router; 