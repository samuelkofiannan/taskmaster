const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

/**
 * Update user profile picture.
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object to send the result.
 */
const updateProfilePicture = async (req, res) => {
  const { profilePicture } = req.body;
  const userId = req.user.id; // Get user ID from auth middleware

  // Validate input
  if (!profilePicture) {
    return res.status(400).json({ error: 'Profile picture URL is required' });
  }

  try {
    await User.findByIdAndUpdate(userId, { profilePicture }, { new: true });
    res.status(200).json({ message: 'Profile picture updated successfully!' });
  } catch (error) {
    console.error('Error updating profile picture:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Update user username.
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object to send the result.
 */
const updateUsername = async (req, res) => {
  const { username } = req.body;
  const userId = req.user.id; // Get user ID from auth middleware

  // Validate input
  if (!username || username.trim().length === 0) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    await User.findByIdAndUpdate(userId, { username }, { new: true });
    res.status(200).json({ message: 'Username updated successfully!' });
  } catch (error) {
    console.error('Error updating username:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Change user password.
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object to send the result.
 */
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // Get user ID from auth middleware

  // Validate input
  if (!oldPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Invalid password input' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided old password with the stored hashed password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    // Hash the new password and update it
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

    res.status(200).json({ message: 'Password changed successfully!' });
  } catch (error) {
    console.error('Error changing password:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  updateProfilePicture,
  updateUsername,
  changePassword,
};
