const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    const user = await authController.registerUser(req.body);
    res.status(201).json({
      message: 'User registered successfully',
      user: user
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user and return a JWT token
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const token = await authController.loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   GET /api/auth/user
 * @desc    Get the current user's details
 * @access  Private (requires JWT)
 */
router.get('/user', authenticate, async (req, res) => {
  try {
    const user = await authController.getUser(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    console.error('Get user error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
