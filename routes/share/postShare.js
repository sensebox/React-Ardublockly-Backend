// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const { createId } = require('mnemonic-id');

const Share = require('../../models/share');

const postShare = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try{
    const body = {
      link: createId(10),
      name: req.body.name,
      xml: req.body.xml,
      expiresAt: moment.utc().add(Number(process.env.SHARE_EXPIRES_IN),'seconds').toDate(),
    };
    const share = new Share(body);
    const savedShare = await share.save();
    return res.status(201).send({
      message: 'Sharing-Content is successfully created.',
      content: savedShare
    });
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postShare
};
