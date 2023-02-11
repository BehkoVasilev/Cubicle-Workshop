const authService = require('../service/authService');

const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('auth/login')
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

    if (existingUser){
        return res.redirect('/404');  
    }

    const user = await authService.register(username, password);

});

module.exports = router;