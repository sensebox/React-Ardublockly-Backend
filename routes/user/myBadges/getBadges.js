// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');

const getBadges = async function(req, res){
  try{
    var user = await User.findOne({email: req.user.email});
    if(user && user.badge){
      // get all badges from signed in user
      request.get(`${process.env.MYBADGES_API}/api/v1/domain/badge?userId=${user.badge}&name=sensebox`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${process.env.MYBADGES_API_DOMAIN_TOKEN}`
        }})
        .on('response', function(response) {
          // concatenate updates from datastream
          var badgesBody = '';
          response.on('data', function(chunk){
            badgesBody += chunk;
          });
          response.on('end', async function(){
            if(response.statusCode !== 200){
              return res.status(200).send({
                message: 'Badges successfully found.',
                badges: null
              });
            }
            badgesBody = JSON.parse(badgesBody);
            return res.status(200).send({
              message: 'Badges successfully found.',
              badges: badgesBody.badges
            });
          });
      })
      .on('error', function(err) {
        return res.status(500).send(err);
      });
    }
    else {
      return res.status(400).send({
        message: 'User is not connected to MyBadges.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getBadges
};
