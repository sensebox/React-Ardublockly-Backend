// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Gallery = require('../../models/gallery');
const User = require('../../models/user');

/**
 * @api {put} /gallery/:galleryId Update gallery
 * @apiName putGallery
 * @apiDescription Update a specific gallery.
 * @apiGroup Gallery
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} galleryId the ID of the gallery you are referring to
 * @apiParam {String} [title] name of the project
 * @apiParam {String} [description] further information about the project
 * @apiParam {String} [xml] XML-String of the blockly-content
 *
 * @apiSuccess (Success 200) {String} message `Gallery is updated successfully.`
 * @apiSuccess (Success 200) {Object} gallery `{
		"_id": "5fd8a66cb40982332c400bc4",
		"title": "flimsy-cougar",
		"description": "Beschreibung",
		"xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
		"creator": "em@il.de",
		"createdAt": "2020-12-15T12:05:00.662Z",
		"updatedAt": "2020-12-15T12:05:00.662Z",
		"__v": 0
	}`
 *
 * @apiError (On error) {Object} 400 `{"message": Gallery not found."}`
 * @apiError (On error) {Object} 403 `{"message": No permission updating the gallery project."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const putGallery = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try {
    var oldGallery = await Gallery.findOne({_id: req.params.galleryId});
    if(oldGallery){
      var user = await User.findOne({email: req.user.email});
      var owner = req.user.email;
      if(owner === oldGallery.creator){
        var updatedGallery = {};
        updatedGallery.title = req.body.title || oldGallery.title;
        updatedGallery.description = req.body.description || oldGallery.description;
        updatedGallery.xml = req.body.xml || oldGallery.xml;
        var gallery = await Gallery.findOneAndUpdate({_id: oldGallery._id}, updatedGallery, {upsert: true, new: true});
        return res.status(200).send({
          message: 'Gallery is updated successfully.',
          gallery: gallery
        });
      }
      else {
        return res.status(403).send({
          message: 'No permission updating the gallery project.',
        });
      }
    }
    else {
      return res.status(400).send({
        message: 'Gallery not found.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  putGallery
};
