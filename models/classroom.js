// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const ClassroomProjectsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    xml: {
        type: String
    }
}, {
    timestamps: true
});

const NicknameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    projects: {
        type: [ClassroomProjectsSchema],
        default: [],
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, {
    timestamps: true
});


// Generate JWT token
NicknameSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
};

// Generate refresh token
NicknameSchema.methods.generateRefreshToken = function() {
    const refreshToken = jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    this.refreshToken = refreshToken;
    return refreshToken;
};

// Verify JWT token
NicknameSchema.statics.verifyToken = function(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

// Verify refresh token
NicknameSchema.statics.verifyRefreshToken = function(token) {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
};

const ClassroomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        ref: 'User',
        required: true
    },
    classroomCode: {
        type: String,
        required: true
    },
    students: {
        type: [NicknameSchema],
        default: undefined,
    },
}, {
    timestamps: true
});



module.exports = mongoose.model('Classroom', ClassroomSchema);
