const Cube = require('../models/Cube')

exports.getHomeController = async (req, res) => {
    let { search, from, to } = req.query;
    from = Number(from);
    to = Number(to);

    let cubes = await Cube.find().lean(); //Under the hood, after executing a query, Mongoose converts the query results from POJOs to Mongoose documents. If you turn on the lean option, Mongoose skips this step.

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
    res.render('404');
};