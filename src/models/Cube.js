const { default: mongoose } = require("mongoose");

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
    imageUr: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
              return /^(http(s)?:\/\/)/.test(v);
            },
            message: props => `${props.value} url!`
          },
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    }
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;