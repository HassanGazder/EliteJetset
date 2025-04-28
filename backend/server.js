require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { sendTestEmail } = require('./services/emailService');

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',         // local React dev server
  'https://elite-jetset.vercel.app', // deployed frontend on Vercel
  'https://elitejetset.apollodigitals.co.uk',       // main WordPress site
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like curl or Postman) or if origin is allowed
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Test email endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    const result = await sendTestEmail();
    if (result.success) {
      res.json({ message: result.message });
    } else {
      res.status(500).json({ error: result.error, details: result.details });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ error: 'Failed to send test email' });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// }); 
module.exports = app;