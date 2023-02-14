const Accessory = require('../models/Accessory');

const cubeService = require('../service/cubeService');
const cubeUtils = require('../utils/cubeUtils');

exports.getCreateCube = (req, res) => {
    console.log(req.user)
    res.render('cube/create');
}

exports.postCreateCube = async (req, res) => {

    const { name, description, imageUrl, difficultyLevel } = req.body;

    let cube = await cubeService.createOne({
        name,
        description,
        imageUrl,
        difficultyLevel,
        owner: req.user._id
    });

    await cube.save();
    res.redirect('/');
}

exports.getDetailsController = async (req, res) => {
    const cubeId = req.params.cubeId;

    const cube = await cubeService.getOneAndPopulate(cubeId);
    const isOwner = req.user?._id == cube.owner;

    if (!cube) {
        return res.redirect('/404')
    }
    res.render('cube/details', { cube, isOwner });
};

exports.getAttachAccessory = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);
    const accessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean();
    res.render('cube/attach', { cube, accessories });
};

exports.postAttachAccessory = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);
    const accessoryId = req.body.accessory;

    cube.accessories.push(accessoryId);
    await cube.save();

    res.redirect(`/cubes/${cube._id}/details`);
};

exports.getEditCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    res.render('cube/edit', { cube, difficultyLevels });
};

exports.postEditCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeService.updateOne(req.params.cubeId, {
        name,
        description,
        imageUrl,
        difficultyLevel
    });

    res.redirect(`/cubes/${req.params.cubeId}/details`)
};

exports.getDeleteCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    res.render('cube/delete', { cube, difficultyLevels });
};

exports.postDeleteCube = async (req, res) => {
    await cubeService.deleteOne(req.params.cubeId);

    res.redirect('/')
};