const Cube = require('../models/Cube');

exports.getCreateCube = (req, res) => {
    res.render('create');
}

exports.postCreateCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    let cube = new Cube({ name, description, imageUrl, difficultyLevel });

    await cube.save();
    res.redirect('/');
}

exports.getDetailsController = async (req, res) => {
    const cubeId = req.params.cubeId;

    const cube = await Cube.findById(cubeId).lean();

    if (!cube) {
        return res.redirect('/404')
    }
    res.render('details', { cube });
};