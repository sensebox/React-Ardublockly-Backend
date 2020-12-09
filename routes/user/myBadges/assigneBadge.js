// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');

const assigneBadge = async function(req, res){
  try{
    var user = await User.findOne({email: req.user.email});
    if(user && user.badge){
      // assigne badge to user
      request.put(`${process.env.MYBADGES_API}/api/v1/domain/badge/${req.params.badgeId}/assigne/user/${user.badge}`, {
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
              return res.status(400).send({
                message: 'Badges is already assigned to user.',
              });
            }
            badgesBody = JSON.parse(badgesBody);
            return res.status(200).send({
              message: 'Badge successfully assigned to user.',
              badge: badgesBody.badge
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
  assigneBadge
};
