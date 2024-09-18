const User = require("../../../models/user");

/**
 * @api {put} /user/role Change User Role
 * @apiName changeUserRole
 * @apiDescription Allows an admin user to change the role of another user.
 * @apiGroup User
 *
 * @apiHeader {String} Authorization A valid JSON Web Token (JWT) with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example:
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTgxZjM2ZTUwMmNkMjMxNTJmMmM1OSIsImlhdCI6MTYxMzY5MDQwOH0.jW9fZhURmT4Esdl7i7
 *
 * @apiParam {String} email The email address of the user whose role is to be changed.
 * @apiParam {String} newRole The new role to assign to the user. Must be one of ["admin", "creator", "user"].
 *
 * @apiSuccess (Success 200) {String} message `User role updated successfully to <newRole>.`
 * @apiSuccess (Success 200) {Object} user The updated user object with the new role.
 *
 * @apiError (On error) {Object} 400 `{"message": "Invalid role specified."}`
 * @apiError (On error) {Object} 404 `{"message": "User not found."}`
 * @apiError (On error) {Object} 403 `{"message": "Access denied. Admins only."}`
 * @apiError (On error) {Object} 500 `{"message": "Failed to update user role."}`
 */


// Route to change user role (only accessible by admin)
const putRole = async function (req, res) {
  const { _id, newRole } = req.body;

  // Check if the new role is valid
  const validRoles = ['admin', 'creator', 'user'];
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({ message: 'Invalid role specified.' });
  }

  try {
    // Find the user by id and update their role
    const user = await User.findOneAndUpdate(
      { _id: _id },
      { $set: { role: newRole } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({
      message: `User role updated successfully to ${newRole}.`,
      user: user,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update user role.', error: err });
  }
};

module.exports = {
    putRole,
  };
  
