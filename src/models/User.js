const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;