const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'Username already exists']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists'],
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

module.exports = User;