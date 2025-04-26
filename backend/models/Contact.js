const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    travelDate: {
        type: String,
        required: true
    },
    numberOfTravelers: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'completed'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema); 