const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { sendContactFormEmail, sendAgentContactFormEmail } = require('../services/emailService');

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Submit contact form
router.post('/submit', async (req, res) => {
    try {
        const { 
            name, 
            email, 
            phone, 
            message, 
            destination,
            travelDate,
            numberOfTravelers,
            budget,
            agentUsername 
        } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !message || !destination || !travelDate || !numberOfTravelers || !budget) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the referring agent
        const referringAgent = await User.findOne({ username: agentUsername, role: 'agent' });
        if (!referringAgent) {
            return res.status(400).json({ message: 'Invalid agent username' });
        }

        // Create new contact
        const contact = new Contact({
            name,
            email,
            phone,
            message,
            destination,
            travelDate,
            numberOfTravelers,
            budget,
            referredBy: referringAgent._id
        });

        await contact.save();

        // Send email to admin
        await sendContactFormEmail({
            name,
            email,
            phone,
            message,
            destination,
            travelDate,
            numberOfTravelers,
            budget
        }, agentUsername);

        // Send email to referring agent
        await sendAgentContactFormEmail({
            name,
            email,
            phone,
            message,
            destination,
            travelDate,
            numberOfTravelers,
            budget
        }, referringAgent.email);

        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Contact form submission error:', error);
        res.status(500).json({ message: 'Error submitting contact form' });
    }
});

// Get agent's contact submissions (for authenticated agents)
router.get('/agent-submissions', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user || user.role !== 'agent') {
            return res.status(403).json({ message: 'Agent access required' });
        }

        const submissions = await Contact.find({ referredBy: user._id })
            .sort({ createdAt: -1 });

        res.json(submissions);
    } catch (error) {
        console.error('Error fetching agent submissions:', error);
        res.status(500).json({ message: 'Error fetching submissions' });
    }
});

module.exports = router; 