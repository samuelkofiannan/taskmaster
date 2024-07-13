const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { authenticate } = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

/**
 * @route   PUT /api/settings/profile-picture
 * @desc    Update user profile picture
 * @access  Private (requires JWT)
 */
router.put('/profile-picture', 
  authenticate,
  check('profilePicture', 'Profile picture URL is required').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  settingsController.updateProfilePicture
);

/**
 * @route   PUT /api/settings/username
 * @desc    Update user username
 * @access  Private (requires JWT)
 */
router.put('/username', 
  authenticate,
  check('username', 'Username is required').notEmpty(),
  check('username', 'Username must be at least 3 characters').isLength({ min: 3 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  settingsController.updateUsername
);

/**
 * @route   PUT /api/settings/password
 * @desc    Change user password
 * @access  Private (requires JWT)
 */
router.put('/password', 
  authenticate,
  check('oldPassword', 'Old password is required').notEmpty(),
  check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  settingsController.changePassword
);

module.exports = router;
