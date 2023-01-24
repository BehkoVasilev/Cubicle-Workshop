const db = require('../db.json')

exports.getHomeController = (req, res) => {
    let { search, from, to } = req.query;
    from = Number(from);
    to = Number(to);

    let cubes = db.cubes;

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