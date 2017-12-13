'use strict'

const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post('/register', (req, res, next) => {
    const registration = new User({ name: req.body.name, email: req.body.email, password: req.body.password});
    User.registerUser(registration);
    res.json({ success: true, result: 'User added correctly'});
});

router.post('/authenticate', (req, res, next) => {
    
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