  "use strict";

const express = require('express');
const mongoose = require('mongoose');

const Solution = require('../../models/solution');

/**
 * @api {get} /solutions/:solutionId Get a solution by ID
 * @apiName getSolution
 * @apiDescription Get a specific solution by its ID. Uses student session authentication.
 * @apiGroup Solution
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3   
 *  J329j7JrPst6p02d311u7AsXVCUEyvoiTo  
 * * @apiParam {String} solutionId id of the solution (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Solution found successfully.`
 * @apiSuccess (Success 200) {Object} solution `{
        "_id": "5fd8a66cb40982332c400bc4",
        "xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
        "creator": "pseudoUserId",
        "createdAt": "2020-12-15T12:05:00.662Z",
        "updatedAt": "2020-12-15T12:05:00.662Z",
    }`
 *
 * @apiError (On error) {Object} 403 `{"message": No permission viewing the solution."}`        
 * @apiError (On error) {Object} 404 `{"message": Solution not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const getSolution = async function(req, res){
  try{
    var result = await Solution.find({});
    return res.status(200).send({
      message: 'Solutions found successfully.',
      solutions: result
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getSolution
};