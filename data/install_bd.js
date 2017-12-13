
'use strict'

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs'); //leer archivo json
const filePath = path.join(__dirname, '/ads.json');

mongoose.Promise = global.Promise;

require('../lib/connectMongo');

console.log(process.cwd())

const obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const Ad = require('../models/Ad');
const User = require('../models/User');

Ad.remove({}, (err) => {//Eliminamos registros        
     if (err) throw error;
     console.log('Ads deleted');
});  

User.remove({}, (err) => {//Eliminamos registros        
    if (err) throw error;
    console.log('Users deleted');
});  

Ad.insertMany(obj.ads, (err,data) => {
    if (err) throw error;
    console.log('Ads added')
});







