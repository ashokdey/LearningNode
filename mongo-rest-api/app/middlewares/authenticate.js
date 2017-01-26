const {User} = require('./../models/user');

let authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    
    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        // modify the req object to be used in the route
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send({
            err,
            status : 401
        });
    });    
}

module.exports = {authenticate};