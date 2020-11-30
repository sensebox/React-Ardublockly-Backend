// jshint esversion: 8
// jshint node: true
"use strict";

const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './upload');
    },
    filename: (req, file, cb) => {
      cb(null, /*${req.user.id}_*/`${Date.now()}_${file.originalname}`);
    }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var fields = req.files.filter(file => /^steps\[\d\]\[media\]\[picture\]$/.test(file.fieldname));
    var extensionType = file.mimetype.split('image/')[1];
    if(fields.length !== req.files.length){
      req.fileValidationError = "Files are only allowed at this specific field {steps: [{media: {picture: File}}]}]";
      return callback(null, false);
    }
    else if(extensionType !== 'png' && extensionType !== 'jpg' && extensionType !== 'gif' && extensionType !== 'jpeg') {
      req.fileValidationError = "Only images with extension 'PNG', 'JPEG', 'JPG' and 'GIF' are allowed.";
      return callback(null, false);
    }
    else {
      callback(null, true);
    }
  }
});

module.exports = {
  upload
};
