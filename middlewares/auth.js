const jwt = require('jsonwebtoken');
const env = require('../env')
module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) return res.status(401).json({status: 'error', message:'Please specify authorization header'});
        const token = authHeader.split(' ')[1];
        const tokenData = jwt.verify(token, env.JWT_SECRET);
        req.user = tokenData.id;
        next();
    } catch (error) {
       return res.status(401).json({status: 'error', message:'you are not authorized'});

    }

}