

// jshint esversion: 8
// jshint node: true
"use strict";

const User = require("../../../models/user");

/**
 * @api {get} /user/users Get All Users
 * @apiName getAllUser
 * @apiDescription Retrieves a list of all users in the system. Only accessible to admin users.
 * @apiGroup User
 *
 * @apiHeader {String} Authorization A valid JSON Web Token (JWT) with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example:
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTgxZjM2ZTUwMmNkMjMxNTJmMmM1OSIsImlhdCI6MTYxMzY5MDQwOH0.jW9fZhURmT4Esdl7i7
 *
 * @apiSuccess (Success 200) {Object[]} users A list of users.
 * @apiSuccess (Success 200) {String} users._id The unique ID of the user.
 * @apiSuccess (Success 200) {String} users.email The email of the user.
 * @apiSuccess (Success 200) {String} users.role The role of the user (admin, creator, or user).
 * @apiSuccess (Success 200) {Array} users.status The status array related to the user's progress or tasks.
 *
 * @apiError (On error) {Object} 500 `{"message": "Failed to retrieve users", "error": "<error details>"}`
 */


const getAllUser = async function (req, res) {
    try {
        const users = await User.find(); // Query to get all users
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: "Failed to retrieve users", error });
      }
    };


module.exports = {
  getAllUser,
};
