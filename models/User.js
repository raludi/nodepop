'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    mail: { type: String, index: true },
    password: String
},
{
    collection: 'Users'
});

const User = mongoose.model('User', userSchema);

module.exports = User;