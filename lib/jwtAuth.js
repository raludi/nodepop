
'use strict'

const jwt = require('jsonwebtoken');

module.exports = () => {
    return function(req, res, next) {
        //leer credenciales
        const lang = req.get('Accept-Language');
        const token = req.body.token || req.query.token || req.get('x-access-token');
        if (!token) {
            next(new customError('NO_TOKEN', 401, lang));
            return;
        }
        //comprobar credenciales
        jwt.verify( token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                next(new customError('INVALID_TOKEN', 401, lang));
                return;
            }
            req.userId = decoded.user_id;//decoded es lo que metí como user_id
            next();//continuar
        });
        
    }
}