const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLenght: 200,
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