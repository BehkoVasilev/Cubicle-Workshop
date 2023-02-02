const router = require('express').Router();

const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');

router.get('/', homeController.getHomeController);
router.get('/about', homeController.getAboutController);

router.get('/cubes/create', cubeController.getCreateCube); 
router.post('/cubes/create', cubeController.postCreateCube);
router.get('/cubes/:cubeId/details', cubeController.getDetailsController);
router.get('/cubes/:cubeId/attach', cubeController.getAttachAccessory);
router.post('/cubes/:cubeId/attach', cubeController.postAttachAccessory);

router.use('/accessories', accessoryController);


router.get('/404', homeController.getErrorPage);
router.get('*', homeController.getErrorPage);



module.exports = router