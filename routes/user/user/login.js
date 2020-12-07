// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');

const login = function(req, res){
  try{
    var options = {
      body: JSON.stringify(req.body),
      headers: {
        'Content-type': 'application/json'
      }
    };
    request.post('https://api.opensensemap.org/users/sign-in', options)
      .on('response', function(response) {
        // concatenate updates from datastream
        var body = '';
        response.on('data', function(chunk){
          body += chunk;
        });
        response.on('end', async function(){
          if(response.statusCode !== 200){
            return res.status(403).send({
              message: 'User and or password not valid.',
            });
          }
          body = JSON.parse(body);
          // get all information about all boxes from signed in user
          request.get('https://api.opensensemap.org/users/me/boxes', {
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${body.token}`
            }})
            .on('response', function(response) {
              // concatenate updates from datastream
              var boxesBody = '';
              response.on('data', function(chunk){
                boxesBody += chunk;
              });
              response.on('end', async function(){
                if(response.statusCode !== 200){
                  return res.status(403).send({
                    message: 'User and or password not valid.',
                  });
                }
                boxesBody = JSON.parse(boxesBody);
                body.data.user.boxes = boxesBody.data.boxes;
                // check if user already exists in blockly-user-db
                var user = await User.findOneAndUpdate({email: body.data.user.email}, // query
                                                  {$setOnInsert: {email: body.data.user.email}}, // update if not exist
                                                  {upsert: true}); // options
                body.data.user.blocklyRole = user.role;
                body.data.user.badge = user.badge;
                console.log(2, body.data.user.boxes);
                return res.status(200).send({
                  message: 'Successfully signed in.',
                  user: body.data.user,
                  token: body.token,
                  refreshToken: body.refreshToken
                });
              });
            });
          })
          .on('error', function(err) {
            return res.status(500).send(err);
          });
      })
      .on('error', function(err) {
        return res.status(500).send(err);
      });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  login
};
