const authService = require('../service/authService');

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
        res.redirect('/invalid');
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.redirect('/404');
    }

    const existingUser = await authService.getUserByUsername(username);

    if (existingUser) {
        return res.redirect('/404');
    }

    const user = await authService.register(username, password);
    console.log(user);

    res.redirect('/login')
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;