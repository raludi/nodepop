
'use strict'

const jwt = require('jsonwebtoken');

module.exports = () => {
    return function(req, res, next) {
        //leer credenciales
        const token = req.body.token || req.query.token || req.get('x-access-token');

        if (!token) {
            const err = new Error('No token provided');
            err.status = 401;
            next(err);
            return;
        }
        //comprobar credenciales
        jwt.verify( token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {

                const error = new Error('Invalid token');
                error.status = 401;
                next(error);
                return;
            }
            req.userId = decoded.user_id;//decoded es lo que metí como user_id
            next();//continuar
        });
        
    }
}