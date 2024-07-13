const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // To load environment variables from a .env file

/**
 * Register a new user.
 * @param {Object} userData - The user data for registration.
 * @returns {Object} The registered user.
 * @throws {Error} If there is an error during registration.
 */
const registerUser = async (userData) => {
  try {
    const { username, email, password } = userData;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      throw new Error('All fields are required.');
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return user;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw new Error(error.message || 'Internal Server Error');
  }
};

/**
 * Login a user.
 * @param {Object} credentials - The user credentials containing email and password.
 * @returns {string} The JWT token.
 * @throws {Error} If there is an error during login.
 */
const loginUser = async (credentials) => {
  try {
    const { email, password } = credentials;

    // Check if all required fields are provided
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials.');
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials.');
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return token;
  } catch (error) {
    console.error('Error logging in user:', error.message);
    throw new Error(error.message || 'Internal Server Error');
  }
};

/**
 * Get the current user's details.
 * @param {string} userId - The ID of the user.
 * @returns {Object} The user details.
 * @throws {Error} If there is an error during retrieval.
 */
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  } catch (error) {
    console.error('Error getting user:', error.message);
    throw new Error(error.message || 'Internal Server Error');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
