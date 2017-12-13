'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, index: true },
    password: { type: String, index: true}
},
{
    collection: 'Users'
});

/** 
 * Validate User
*/
userSchema.statics.validateUser = function(user) {
    const query = User.find({email: user.email, password: user.password});
    return query.exec();
};

userSchema.statics.registerUser = function(user) {
    user.save(function (err) {
        if (err) return handleError(err);
    });
}

userSchema.statics.getUsers = function() {
    const query = User.find();
    query.select('name');
    return query.exec();
}
 
const User = mongoose.model('User', userSchema);

module.exports = User;