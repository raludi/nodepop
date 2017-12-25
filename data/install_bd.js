
'use strict'

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs'); //leer archivo json
const filePathAds = path.join(__dirname, '/ads.json');
const filePathUsers = path.join(__dirname, '/users.json');
const SHA256 = require('crypto-js/sha256');

mongoose.Promise = global.Promise;

require('../lib/connectMongo');

console.log(process.cwd())

const objAds = JSON.parse(fs.readFileSync(filePathAds, 'utf8'));
const objUsers = JSON.parse(fs.readFileSync(filePathUsers, 'utf8'));
const Ad = require('../models/Ad');
const User = require('../models/User');

objUsers.user.forEach((obj) => {
    obj.password = SHA256(obj.password);
}); 

async function installDB() {
    await Ad.remove({}).exec();

    await User.remove({}).exec();

    await User.insertMany(objUsers.user, (err,data) => { //Al hacerlo con await no hace falta un callback
        if (err) throw error;
        console.log('Users added')
    }); 
    await Ad.insertMany(objAds.ads, (err,data) => {
        if (err) throw error;
        console.log('Ads added')
    });
}

installDB().then(() => {
    console.log("Insertion completed");
    process.exit(0);
  })
  .catch(err => {
    console.log("Error: ", err);
    process.exit(1);
  });





