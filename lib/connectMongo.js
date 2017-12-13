'use strict'

const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/nodepop', {
    useMongoClient: true
});

conn.on('error', (err) => {
    console.log('Error conexión ', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log(`Conectado a mongodb en ${mongoose.connection.name}`);
});

module.exports = conn;