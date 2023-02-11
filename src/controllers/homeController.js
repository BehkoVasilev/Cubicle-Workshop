const Cube = require('../models/Cube')

exports.getHomeController = async (req, res) => {
    let { search, from, to } = req.query;
    from = Number(from);
    to = Number(to);

    let cubes = await Cube.find().lean(); //By default, Mongoose queries return an instance of the Mongoose Document class. Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking. Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO.

    //TODO: use db filtration instead of in memory filtering
    if (search) {
        cubes = cubes.filter(cube => cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    };

    if (from) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= from);
    };

    if (to) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= to);
    };

    res.render("index", { cubes, search, from, to })
};

exports.getAboutController = (req, res) => {
    res.render('about');
};

exports.getErrorPage = (req, res) => {
    res.render('errors/404');
};