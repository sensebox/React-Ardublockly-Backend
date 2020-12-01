// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var GalleryRouter = express.Router();

GalleryRouter.route('/')
  .post(require('./postGallery').postGallery);

GalleryRouter.route('/:galleryId')
  .put(require('./putGallery').putGallery);

GalleryRouter.route('/:galleryId')
  .delete(require('./deleteGallery').deleteGallery);

GalleryRouter.route('/')
  .get(require('./getGalleries').getGalleries);

GalleryRouter.route('/:galleryId')
  .get(require('./getGallery').getGallery);

module.exports = GalleryRouter;
