const router = require('express').Router();

const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');

router.get('/', homeController.getHomeController);

router.get('/about', homeController.getAboutController);

router.get('/create', cubeController.getCreateCube); 
router.post('/create', cubeController.postCreateCube);

router.get('/details/:cubeId', cubeController.getDetailsController);
router.get('/404', homeController.getErrorPage);
router.use('/accessory', accessoryController);


router.get('*', homeController.getErrorPage);



module.exports = router