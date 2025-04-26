require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Contact = require('../models/Contact');

async function viewData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // View Users
        console.log('\n=== Users ===');
        const users = await User.find({});
        console.log(JSON.stringify(users, null, 2));

        // View Contacts
        console.log('\n=== Contacts ===');
        const contacts = await Contact.find({});
        console.log(JSON.stringify(contacts, null, 2));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('\nMongoDB connection closed');
    }
}

viewData(); 