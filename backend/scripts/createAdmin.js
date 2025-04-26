const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const setupAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@elitejetset.com';
    const adminUsername = 'admin';
    const adminPassword = 'Admin@123'; // You should change this to a more secure password

    // Check if admin already exists by email or username
    let existingAdmin = await User.findOne({ $or: [{ email: adminEmail }, { username: adminUsername }] });

    // Calculate the hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...');
      // Update password directly (bypassing the pre-save hook)
      await User.updateOne(
        { _id: existingAdmin._id },
        { $set: { password: hashedPassword } }
      );
      console.log(`Password for admin (${adminEmail}) has been updated.`);
    } else {
      console.log('Admin user not found. Creating new admin user...');
      // Create admin user (password will be hashed by pre-save hook)
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: adminEmail,
        username: adminUsername,
        // Set the plain password here; the pre-save hook will hash it
        password: adminPassword, 
        role: 'admin',
        referralCode: 'ADMIN01'
      });

      await adminUser.save();
      console.log('Admin user created successfully:');
      console.log('Email:', adminUser.email);
      console.log('Username:', adminUser.username);
      console.log('Password:', adminPassword); // Only show this during setup
    }

    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin user:', error);
    process.exit(1);
  }
};

setupAdminUser(); 