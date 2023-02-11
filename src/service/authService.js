const User = require('../models/User');

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
        throw 'Invalid username or password'
    }
    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw 'Invalid username or password'
    }

    return user;
};
