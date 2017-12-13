'use strict'

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

router.post('/register', (req, res, next) => {
    const registration = new User({ name: req.body.name, email: req.body.email, password: req.body.password});
    User.registerUser(registration);
    res.json({ success: true, result: 'User added correctly'});
});

router.post('/authenticate', async (req, res, next) => {
    try {
        var filter = {};
        filter.email = req.body.email;
        filter.password = req.body.password;      
        const row = await User.validateUser(filter);   
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
        res.json({ success: false, message: err.message});
        return;
    }
});

/*router.get('/', async (req, res, next) => {
    try {
        const rows = User.getUsers();
        console.log = rows;
        res.json({ success: true, result: (rows.length <= 0 ? 'No users' : rows)})
    } catch(err) {
        next(err);
    }

});*/

module.exports = router;