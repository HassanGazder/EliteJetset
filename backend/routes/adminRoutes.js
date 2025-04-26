const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendRegistrationLinkEmail } = require('../services/emailService');

// Middleware to verify admin role
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Generate registration token (admin only)
router.post('/generate-registration-link', verifyAdmin, async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a registration token that expires in 24 hours
    const registrationToken = jwt.sign(
      { email, type: 'registration' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create the registration link
    const registrationLink = `${process.env.FRONTEND_URL}/register?token=${registrationToken}`;

    // Send the registration link via email
    await sendRegistrationLinkEmail(email, registrationLink);

    // Return the registration link
    res.json({
      message: 'Registration link sent successfully',
      registrationLink
    });
  } catch (error) {
    console.error('Error generating registration link:', error);
    res.status(500).json({ message: 'Error generating registration link' });
  }
});

// Get all agents (admin only)
router.get('/agents', verifyAdmin, async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }, '-password');
    res.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ message: 'Error fetching agents' });
  }
});

// Get all contact submissions (admin only)
router.get('/contacts', verifyAdmin, async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const contacts = await Contact.find().populate('referredBy', 'firstName lastName email username');
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

module.exports = router; 