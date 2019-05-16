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
        type: String,
        unique:true
    },
    phoneNumber: {
        type: Number,
        minlength: 11,
        maxlength: 11,
    },
    address: {
        type: String
    }
})

const ContactModel = mongoose.model('contact',ContactSchema);

module.exports = ContactModel