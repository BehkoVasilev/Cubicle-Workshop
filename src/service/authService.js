const jwt = require('../lib/jsonwebtoken');

const User = require('../models/User');
const config = require('../config/config');
const AppError = require('../utils/AppError');


// exports.getUserByUsername = async? (username) => {
//     const user = await User.findOne({ username });
//     return user
////return User.findOne({ username })?
// };
exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username);

    if(user === null){
        throw new AppError('Invalid username or password!', {user});
    }
    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new AppError('Invalid username or password!');
    }

    const payload = {_id: user._id, username: user.username};
    const options = {expiresIn: '4h'};

    const token = await jwt.sign(payload, config.SECRET, options)

    return token;
};

exports.logout = () => {
    res.clearCookie('auth');

    res.redirect('/')
}
