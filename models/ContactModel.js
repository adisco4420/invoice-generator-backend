const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: Number,
        minlength: 11,
        maxlength: 11,
    },
    address: {
        type: String
    },
    accounts: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const ContactModel = mongoose.model('contact',ContactSchema);

module.exports = ContactModel