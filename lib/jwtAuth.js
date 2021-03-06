
'use strict'

const jwt = require('jsonwebtoken');
const customError = require('../utils/customError');
module.exports = () => {
    return function(req, res, next) {
        const token = req.body.token || req.query.token || req.get('x-access-token');
        if (!token) {
            next(new customError('NO_TOKEN', 401));
            return;
        }
        //comprobar credenciales
        jwt.verify( token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                next(new customError('INVALID_TOKEN', 401));
                return;
            }
            req.userId = decoded.user_id;//decoded es lo que metí como user_id
            next();
        });
        
    }
}