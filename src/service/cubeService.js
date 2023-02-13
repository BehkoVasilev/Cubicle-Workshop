const Cube = require('../models/Cube');

exports.createOne = (data) => new Cube(data)

exports.getOne = (cubeId) => Cube.findById(cubeId).lean();

exports.getOneAndPopulate = (cubeId) => Cube.findById(cubeId).populate('accessories').lean();

exports.updateOne = (cubeId, data) => Cube.findByIdAndUpdate({_id: cubeId}, {...data});

exports.deleteOne = (cubeId) => Cube.deleteOne({_id: cubeId});
