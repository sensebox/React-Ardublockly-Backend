// jshint esversion: 8
// jshint node: true
"use strict";

const mongoose = require('mongoose');
const chalk = require('chalk');

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const connectMongoDB = async function(cb) {
  // set up default ("Docker") mongoose connection
  await mongoose.connect(`mongodb://${mongoUsername}:${mongoPassword}@mongo:27017/${process.env.MONGO_DBNAME}`, {
    authSource: 'admin',
    useNewUrlParser: true,
    useCreateIndex: true,
    autoReconnect: true,
  }).then(db => {
    console.log(chalk.green('Connected to MongoDB (databasename: "' + db.connections[0].name + '") on host "' + db.connections[0].host + '" and on port "' + db.connections[0].port + '""'));
    cb();
  }).catch(async err => {
    console.log(chalk.red('Connection to '+'mongodb://mongo/'+process.env.MONGO_DBNAME+' failed, try to connect to '+'mongodb://localhost:27017/'+process.env.MONGO_DBNAME));
    // set up "local" mongoose connection
    await mongoose.connect(`mongodb://${mongoUsername}:${mongoPassword}@localhost:27017/${process.env.MONGO_DBNAME}`, {
      authSource: 'test', // db where user is stored, command in mongo-shell: 'show users'
      useNewUrlParser: true,
      useCreateIndex: true,
      autoReconnect: true
    }).then(db => {
      console.log(chalk.green('Connected to MongoDB (databasename: "'+db.connections[0].name+'") on host "'+db.connections[0].host+'" and on port "'+db.connections[0].port+'""'));
      cb();
    }).catch(err2nd => {
      console.log(chalk.red('Error at MongoDB-connection with Docker: '+err));
      console.log(chalk.red('Error at MongoDB-connection with Localhost: '+err2nd));
      console.log(chalk.red('Retry to connect in 3 seconds'));
      setTimeout(connectMongoDB, 3000, cb); // retry until db-server is up
    });
  });
};

module.exports = {
  connectMongoDB
};
