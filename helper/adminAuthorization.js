const request = require('request');
const User = require('../models/user'); // Update the path as needed

const adminAuthorization = (req, res, next) => {
  try {
    // Extract the authorization header
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).send({ message: 'Authorization token missing' });
    }

    // Set up the options for the external API request
    const options = {
      url: 'https://api.opensensemap.org/users/me',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token // Pass the JWT token to the external API
      }
    };

    // Make a GET request to the external API to verify the token and get user info
    request.get(options, (error, response, body) => {
      if (error) {
        return res.status(500).json({ message: 'Error connecting to authentication server.' });
      }

    //   // Log the entire response to check the contents
    //   console.log('API Response:', response.statusCode, body);

      if (response.statusCode !== 200) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Parse the response body to get user information
      const userData = JSON.parse(body);
      console.log('User Data:', userData);
      // Use the email from the external API response to find the user in your database
      User.findOne({ email: userData.data.me.email }, (err, user) => {
        if (err || !user) {
          return res.status(404).json({ message: 'User not found in the system.' });
        }
        console.log('User:', user);
        // Check if the user has the admin role
        if (user.role === 'admin') {
          next(); // User is an admin, proceed to the next middleware/controller
        } else {
          return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
      });
    });
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, admin user only' });
  }
};

module.exports = {
  adminAuthorization
};