const User = require('../models/User');

// exports.getUserByUsername = async? (username) => {
//     const user = await User.findOne({ username });
//     return user
////return User.findOne({ username })?
// };
exports.getUserByUsername = (username) => User.findOne({username});

exports.register = (username, password) => User.create({ username, password });
