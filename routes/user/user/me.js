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
    var user = await User.findOne({email: body.data.me.email});
    body.data.me.blocklyRole = user.role;
    body.data.me.badge = user.badge;
    return res.status(200).send({
      message: 'User found successfully.',
      user: body.data.me
    });
    // var options = {
    //   headers: {
    //     'Content-type': 'application/json',
    //     'Authorization': req.header('authorization')
    //   }
    // };
    // request.get('https://api.opensensemap.org/users/me', options)
    //   .on('response', function(response) {
    //     // concatenate updates from datastream
    //     var body = '';
    //     response.on('data', function(chunk){
    //       body += chunk;
    //     });
    //     response.on('end', async function(){
    //       if(response.statusCode !== 200){
    //         return res.status(403).send({
    //           message: 'Invalid JWT. Please sign sign in.',
    //         });
    //       }
    //       body = JSON.parse(body);
    //       console.log(body);
    //       var user = await User.findOne({email: body.data.me.email});
    //       body.data.me.blocklyRole = user.role;
    //       body.data.me.badge = user.badge;
    //       return res.status(200).send({
    //         message: 'User found successfully.',
    //         user: body.data.me
    //       });
    //     });
    //   })
    //   .on('error', function(err) {
    //     return res.status(500).send(err);
    //   });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  me
};
