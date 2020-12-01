// jshint esversion: 8
// jshint node: true
"use strict";

const mongoose = require('mongoose');
const chalk = require('chalk');

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const connectMongoDB = async function (cb) {
  await mongoose.connect(`mongodb://${mongoUsername}:${mongoPassword}@mongo:27017/blockly`, {
    authSource: 'admin',
    useNewUrlParser: true,
    useCreateIndex: true,
    autoReconnect: true
  }).then(db => {
    console.log(chalk.green('Connected to MongoDB (databasename: "' + db.connections[0].name + '") on host "' + db.connections[0].host + '" and on port "' + db.connections[0].port + '""'));
    cb();
  }).catch(err => {
    console.log(chalk.red('Error at MongoDB-connection with Localhost: ' + err));
    console.log(chalk.red('Retry to connect in 3 seconds'));
    setTimeout(connectMongoDB, 3000, cb); // retry until db-server is up
  });
};

module.exports = {
  connectMongoDB
};
