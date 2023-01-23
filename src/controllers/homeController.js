const db = require('../db.json')

exports.getHomeController = (req, res) => {
    console.log(db.cubes);
    res.render("index", {cubes: db.cubes})
};

exports.getAboutController = (req, res) => {
    res.render('about');
};

exports.getErrorPage = (req, res) => {
    res.render('404');
};