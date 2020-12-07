// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Share = require('../../models/share');

const getShare = async function(req, res){
  try{
    var id = req.params.shareId;
    var result = await Share.findById(id).populate({path: 'project', select: 'xml'});
    if(result && result.project && result.project.xml){
      result.xml = result.project.xml;
      result.project =  undefined;
    }
    return res.status(200).send({
      message: 'Sharing-Content found successfully.',
      content: result
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getShare
};
