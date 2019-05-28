const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }, 
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
      },
    isVerified: {
    type: Boolean,
    enum: [false, true],
    required: true,
    }, 
    currency: {
        type: String,
    },
    businessName: {
        type: String,
    },
    businessCategory: {
        type: String,
    }, 
    phoneNumber: {
        type: Number,
        required: true,
    },
    accounts: {
        type: Array,
        required: true
    }

})
const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel;