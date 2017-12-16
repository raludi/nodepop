'use strict'

const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/nodepop', {
    useMongoClient: true
});

conn.on('error', (err) => {
    console.log('Connection error ', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log(`Connected to mongodb (${mongoose.connection.name})`);
});

module.exports = conn;