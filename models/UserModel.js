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
    businnessName: {
        type: String,
    },
    businnessCategory: {
        type: String,
    }, 
    phoneNumber: {
        type: Number,
        required: true,
    },
    ExpenseAmount: {
        type: Number
    },
    IncomeAmount: {
        type: Number
    }
})
const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel;