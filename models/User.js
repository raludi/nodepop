'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    mail: String,
    password: String
},
{
    collection: 'Users'
});

const User = mongoose.model('User', userSchema);

module.exports = User;