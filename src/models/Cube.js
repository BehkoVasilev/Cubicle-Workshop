const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [5, 'Name must contain at least 5 characters'],
        match: [/^[a-zA-Z0-9]+$/, 'Username should consist only of latin letters and digits!']
    },
    description: {
        type: String,
        required: true,
        minLength: [20, 'Description must contain at least 20 characters'],
        match: [/^[a-zA-Z0-9]+$/, 'Username should consist only of latin letters and digits!']

    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^(http(s)?:\/\/)/, `Ivalid URL`]
        // validate: {
        //     validator: function (v) {
        //         return /^(http(s)?:\/\/)/.test(v);
        //     },
        //    message: props => `${props.value} - Invalid URL!``
        // },
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;