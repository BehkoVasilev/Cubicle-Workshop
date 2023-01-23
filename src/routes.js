const router = require('express').Router();

const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');

router.get('/', homeController.getHomeController);

router.get('/about', homeController.getAboutController);

router.get('/create', cubeController.getCreateCube) 


module.exports = router