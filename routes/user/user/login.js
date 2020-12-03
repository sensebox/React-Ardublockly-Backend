// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');

const login = async function(req, res){
  try{
    console.log(req.body);
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
          // check if user already exists in blockly-user-db
          body = JSON.parse(body);
          var user = await User.findOneAndUpdate({email: body.data.user.email}, // query
                                            {$setOnInsert: {email: body.data.user.email}}, // update if not exist
                                            {upsert: true}); // options
          body.data.user.blocklyRole = user.role;
          body.data.user.badge = user.badge;
          return res.status(200).send({
            message: 'Successfully signed in.',
            user: body.data.user,
            token: body.token,
            refreshToken: body.refreshToken
          });
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
