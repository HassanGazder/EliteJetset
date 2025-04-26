const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const agents = [
  {
    firstName: 'Mahad',
    lastName: 'Fareed',
    email: 'mahadfareed333@gmail.com',
    username: 'mahadfareed',
    password: 'Test@123',
    role: 'agent',
    referralCode: 'MAHAD01'
  },
  {
    firstName: 'Usman',
    lastName: 'Fareed',
    email: 'usmanfareed888@gmail.com',
    username: 'usmanfareed',
    password: 'Test@123',
    role: 'agent',
    referralCode: 'USMAN01'
  }
];

const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

const seedAgents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await clearDatabase();

    for (const agent of agents) {
      console.log(`Creating new agent: ${agent.email}`);
      
      // Create new agent using the model (this will automatically hash the password)
      const newAgent = new User(agent);
      await newAgent.save();
      
      console.log(`Agent ${agent.email} created successfully.`);
    }

    console.log('Agent setup completed');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up agents:', error);
    process.exit(1);
  }
};

seedAgents(); 