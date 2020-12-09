// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');

const connectAccount = function(req, res){
  try{
    console.log(req.headers['origin']);
    if(req.headers['origin'] === process.env.APP_ORIGIN){
      var options = {
        body: JSON.stringify(req.body),
        headers: {
          'Content-type': 'application/json'
        }
      };
      request.post(`${process.env.MYBADGES_API}/api/v1/user/signin`, options)
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
            var user = await User.findOneAndUpdate({email: req.user.email},{$set: {badge: body.user._id}});
            return res.status(200).send({
              message: 'Successfully connect to MyBadges.',
              account: body.user._id
            });
          });
        })
        .on('error', function(err) {
          return res.status(500).send(err);
        });
    }
    else {
      return res.status(401).send({
        message: 'Unauthorized '
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  connectAccount
};
