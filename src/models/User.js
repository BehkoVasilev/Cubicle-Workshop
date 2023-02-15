const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'Username must contain more than 5 characters'],
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, 'Username should consist only of latin letters and digits!']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password is too short! Must be at least 8 characters!'],
        match: [/^[a-zA-Z0-9]+$/, 'Username should consist only of latin letters and digits!']

    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        });
});

userSchema.method('validatePassword', function(password) {
     return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;