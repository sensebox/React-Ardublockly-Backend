// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var GalleryRouter = express.Router();

const { userAuthorization } = require('../helper/userAuthorization');

GalleryRouter.route('/')
  .post(userAuthorization, require('./postGallery').postGallery);

GalleryRouter.route('/:galleryId')
  .put(userAuthorization, require('./putGallery').putGallery);

GalleryRouter.route('/:galleryId')
  .delete(userAuthorization, require('./deleteGallery').deleteGallery);

GalleryRouter.route('/')
  .get(require('./getGalleries').getGalleries);

GalleryRouter.route('/:galleryId')
  .get(require('./getGallery').getGallery);

module.exports = GalleryRouter;
