'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

router.post('/', async (req, res, next) => {
    try {
        var filter = {};
        filter.email = req.body.email;
        filter.password = req.body.password;

        const row = await Users.validateUser(filter);   
        const userId = { _id: row._id};

        jwt.sign({ user_id: userId._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }, (err, token) => {
            if (err) {
                res.json({ error : 'Auth failed'})
                return next(err);
            }
            res.json({ sucess: true, token: token });
        });

    } catch (err) {
        res.json({ success: false, message: 'User do not exist'});
        return;
    }

})

module.exports = router;