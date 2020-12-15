// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Gallery = require('../../models/gallery');

/**
 * @api {delete} /gallery/:galleryId Delete gallery
 * @apiName deleteGallery
 * @apiDescription Delete a specific gallery.
 * @apiGroup Gallery
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} galleryId the ID of the gallery you are referring to
 *
 * @apiSuccess (Success 200) {String} message `Gallery deleted successfully.`
 *
 * @apiError (On error) {Object} 403 `{"message": No permission deleting the gallery project."}`
 * @apiError (On error) {Object} 404 `{"message": Gallery not found."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const deleteGallery = async function(req, res){
  try{
    var result = await Gallery.findById(req.params.galleryId);
    var owner = req.user.email;
    if(owner === result.creator){
      var gallery = await Gallery.deleteOne({_id: req.params.galleryId});
      if(gallery && gallery.deletedCount > 0){
        return res.status(200).send({
          message: 'Gallery deleted successfully.',
        });
      }
      return res.status(404).send({
        message: 'Gallery not found.',
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission deleting the gallery project.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  deleteGallery
};
