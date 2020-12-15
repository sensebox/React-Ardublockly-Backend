// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Share = require('../../models/share');

/**
 * @api {get} /share/:shareId Create sharing content
 * @apiName getShare
 * @apiDescription Create a sharing link with referenced content. Link expires after 30 days. If you want to share a project, you have to specify the Project-Id, otherwise you have to submit the XML-String. XML-String or Project-Id is required.
 * @apiGroup Share
 *
 * @apiParam {ObjectId} shareId the ID of the sharing-content you are referring to
 *
 * @apiSuccess (Success 200) {String} message `Sharing-Content found successfully.`
 * @apiSuccess (Success 200) {Object} content `{
		"_id": "5fd8a18cd21fca5b98bec4ec",
		"title": "plant-elk",
		"expiresAt": "2021-01-14T11:44:12.131Z",
		"xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
		"createdAt": "2020-12-15T11:44:12.143Z",
		"updatedAt": "2020-12-15T11:44:12.143Z",
		"__v": 0
	}`
 *
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
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
