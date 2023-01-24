const Cube = require('../models/Cube');
const db = require('../db.json');

exports.getCreateCube = (req, res) => {
    res.render('create');
}

exports.postCreateCube = (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    let cube = new Cube(name, description, imageUrl, difficultyLevel);
    // cube.save(cube);
    cube.save();
    res.redirect('/');
}

exports.getDetailsController = (req, res) => {
    const cubeId = Number(req.params.cubeId);

    if (!cubeId) {
        return res.redirect('/404')
    }

    const cube = db.cubes.find(cube => cube.id === cubeId);

    if (!cube) {
        return res.redirect('/404')
    }
    res.render('details', { cube });
};