const authService = require('../service/authService');
const { parserMongooseErrors } = require('../utils/errorUtils');

const router = require('express').Router();



router.get('/invalid', (req, res) => {
    res.render('errors/invalidUser')
});

router.get('/login', (req, res) => {
    res.render('auth/login')
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);
        res.cookie('auth', token, { httpOnly: true })
        console.log(token);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        // res.redirect('/invalid');
        const errors = parserMongooseErrors(err)
        res.render('auth/login', { error: errors[0] })
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async (req, res, next) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        // return next(new Error(`Password missmatch!`));
        return res.render('auth/register', {error: `Password missmatch!`})
    }

    const existingUser = await authService.getUserByUsername(username);

    if (existingUser) {
        return res.render('auth/register', {error: `User already exists!`})
    }

    try{
        const user = await authService.register(username, password);
        console.log(user);
    }catch(err){
        const errors = parserMongooseErrors(err);
        return res.render('auth/register', {error: errors[0]})
    }

    res.redirect('/login')
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;