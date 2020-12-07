// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');

const me = async function(req, res){
  try{
    var body = req.user;
    request.get('https://api.opensensemap.org/users/me/boxes', {
      headers: {
        'Content-type': 'application/json',
        'Authorization': req.header('authorization')
      }})
      .on('response', function(response) {
        // concatenate updates from datastream
        var boxesBody = '';
        response.on('data', function(chunk){
          boxesBody += chunk;
        });
        response.on('end', async function(){
          if(response.statusCode !== 200){
            return res.status(401).send({
              message: 'Unauthorized',
            });
          }
          boxesBody = JSON.parse(boxesBody);
          var user = await User.findOne({email: body.email});
          body.blocklyRole = user.role;
          body.badge = user.badge;
          body.boxes = boxesBody.data.boxes;
          return res.status(200).send({
            message: 'User found successfully.',
            user: body
          });
        });
      });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  me
};
