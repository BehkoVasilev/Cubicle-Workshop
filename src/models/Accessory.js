const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^(http(s)?:\/\/)/, `Ivalid URL`],
        // validate: {
        //     validator: function (v) {
        //         return /^(http(s)?:\/\/)/.test(v);
        //     },
        //     message: props => `${props.value} - Invalid URL!`
        // }
    },
    description: {
        type: String,
        required: true,
        maxLenght: 200,
    },
});

const Accessory = mongoose.model('Accessory', accessorySchema);
module.exports = Accessory;