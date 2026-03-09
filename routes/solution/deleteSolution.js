"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Solution = require('../../models/solution');
const PseudoUser = require('../../models/pseudoUser');

/**
 * @api {delete} /solutions/:solutionId Delete a solution
 * @apiName deleteSolution
 * @apiDescription Delete a specific solution. Uses student session authentication.
 * @apiGroup Solution
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {String} solutionId id of the solution (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Solution deleted successfully.`
 *
 * @apiError (On error) {Object} 403 `{"message": No permission deleting the solution."}`
 * @apiError (On error) {Object} 404 `{"message": Solution not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const deleteSolution = async function(req, res){
  try{
    var result = await Solution.findById(req.params.solutionId);
    var pseudoUserId = req.pseudoUserId.id;
    if(pseudoUserId === result.studentId.toString()){
      var solution = await Solution.deleteOne({_id: req.params.solutionId});
      if(solution && solution.deletedCount > 0){
        return  res.status(200).send({
          message: 'Solution deleted successfully.',
        });
      }
      return res.status(404).send({
        message: 'Solution not found.',
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission deleting the solution.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  deleteSolution
};  