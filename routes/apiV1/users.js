'use strict'

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SHA256 = require('crypto-js/sha256');
const User = require('../../models/User');
const translate = require('../../utils/translate');
const customError = require('../../utils/customError');
const { body, validationResult } = require('express-validator/check');

router.post('/register', [
    body('email').isEmail().withMessage('Must be an email'),
    body('password').isLength({ min: 6 }).withMessage('passwords must be at least 6 chars length')   
    ],
    (req, res, next) => {
    const lang = req.get('Accept-Language');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped);
        return next(new customError(errors.mapped(), 422, lang));
    }
    const pass = SHA256(req.body.password);
    const registration = new User({ name: req.body.name, email: req.body.email, password: pass});
    User.registerUser(registration);
    res.json({ success: true, result: translate('ADDED', lang)});
});

router.post('/authenticate', async (req, res, next) => {
    try {
        const lang = req.get('Accept-Language')
        var filter = {};
        filter.email = req.body.email;
        filter.password = SHA256(req.body.password);    
        const row = await User.validateUser(filter);
        if (row.length <= 0) {
            next(new customError('USER_NOT_FOUND', 404, lang));
            return; 
        }  AUTH_FAIL
        const userId = { _id: row._id};
        jwt.sign({ user_id: userId._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }, (err, token) => {
            if (err) {
                next(new customError('AUTH_FAIL', 404, lang));
                return; 
            }
            res.json({ sucess: true, token: token });
        });

    } catch (err) {
        res.json({ success: false, message: err.message});
        return;
    }
});


module.exports = router;