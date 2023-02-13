const jwt = require('../lib/jsonwebtoken');
const config = require('../config/config');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];
    
    if(token){
        try {
            const decodeToken=  await jwt.verify(token, config.SECRET);
            req.user = decodeToken;
            req.isAuthenticated = true;

            res.locals.username = decodeToken.username
            res.locals.isAuthenticated = true

        }catch(err){
            console.log(err.message);
            res.clearCookie('auth');
            res.redirect('/404');
        }
    }    

    next();
}

exports.isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated){
        res.redirect('/login');
    }

    next();
}