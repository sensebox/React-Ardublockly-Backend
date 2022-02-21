// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const path = require('path');
const router = express.Router();
const { userAuthorization } = require('../../helper/userAuthorization');

const { upload } = require('../../helper/imageUpload');

router.post('/uploadImage', userAuthorization, upload.single('files'), (req, res) => {
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });
    }
    else {
        console.log(req.file);
        return res.send({
            success: true,
            filename: req.file.filename
        })
    }
})

router.get('/:imageName', (req,res) => {
    res.sendFile(path.join(__dirname, "..", '/tutorial/images/', req.params.imageName))
})

module.exports = router;