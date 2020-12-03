// jshint esversion: 8
// jshint node: true
"use strict";


const request = require('request');


const userAuthorization = function(req, res, next){
  var options = {
    headers: {
      'Content-type': 'application/json',
      'Authorization': req.header('authorization')
    }
  };
  request.get('https://api.opensensemap.org/users/me', options)
    .on('response', function(response) {
      // concatenate updates from datastream
      var body = '';
      response.on('data', function(chunk){
        body += chunk;
      });
      response.on('end', async function(){
        if(response.statusCode !== 200){
          return res.status(401).send({
            message: 'Unauthorized',
          });
        }
        req.user = JSON.parse(body).data.me;
        next();
      });
    })
    .on('error', function(err) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    });
};


module.exports = {
  userAuthorization
};
