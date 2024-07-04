const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { check, validationResult } = require('express-validator');

// Validate id parameter for PUT and DELETE requests
const validateId = [
  check('id')
    .isInt()
    .withMessage('ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

/**
 * Get all tasks
 * @route   GET /
 * @access  Public
 */
router.get('/', taskController.getAllTasks);

/**
 * Create a new task
 * @route   POST /
 * @access  Public
 * @param   {string}  title      - The title of the task
 * @param   {string}  description - The description of the task
 * @param   {string}  status     - The status of the task (pending, in progress, completed)
 */
router.post('/', [
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
  check('description')
    .notEmpty()
    .withMessage('Description is required'),
  check('status')
    .isIn(['pending', 'in progress', 'completed'])
    .withMessage('Status must be one of: pending, in progress, completed'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, taskController.createTask);

/**
 * Update a task
 * @route   PUT /:id
 * @access  Public
 * @param   {number}  id         - The ID of the task to update
 * @param   {string}  title      - The new title of the task
 * @param   {string}  description - The new description of the task
 * @param   {string}  status     - The new status of the task (pending, in progress, completed)
 */
router.put('/:id', validateId, [
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
  check('description')
    .notEmpty()
    .withMessage('Description is required'),
  check('status')
    .isIn(['pending', 'in progress', 'completed'])
    .withMessage('Status must be one of: pending, in progress, completed'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, taskController.updateTask);

/**
 * Delete a task
 * @route   DELETE /:id
 * @access  Public
 * @param   {number}  id - The ID of the task to delete
 */
router.delete('/:id', validateId, taskController.deleteTask);

module.exports = router;
