const router = require('express').Router();

const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');
const { isAuthenticated } = require('./middlewares/authMiddleware');

router.get('/', homeController.getHomeController);
router.get('/about', homeController.getAboutController);

router.get('/cubes/create', isAuthenticated, cubeController.getCreateCube); 
router.post('/cubes/create', isAuthenticated, cubeController.postCreateCube);
router.get('/cubes/:cubeId/details', cubeController.getDetailsController);
router.get('/cubes/:cubeId/edit',isAuthenticated, cubeController.getEditCube);
router.post('/cubes/:cubeId/edit', cubeController.postEditCube);
router.get('/cubes/:cubeId/delete', cubeController.getDeleteCube);
router.post('/cubes/:cubeId/delete', cubeController.postDeleteCube);
router.get('/cubes/:cubeId/attach', cubeController.getAttachAccessory);
router.post('/cubes/:cubeId/attach', cubeController.postAttachAccessory);
router.get('/')

router.use('/accessories', accessoryController);
router.use('/', authController)


router.get('/404', homeController.getErrorPage);
router.get('*', homeController.getErrorPage);



module.exports = router