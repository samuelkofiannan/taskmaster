const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticate } = require('../middleware/authMiddleware'); // Correctly import the authenticate function

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const task = await taskController.createTask(req, res);
    res.status(201).json({
      message: 'Task created successfully',
      task: task
    });
  } catch (error) {
    console.error('Create task error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks
 * @access  Private
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const tasks = await taskController.getTasks(req, res);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a task by ID
 * @access  Private
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const task = await taskController.getTaskById(req, res);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Get task error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task by ID
 * @access  Private
 */
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedTask = await taskController.updateTask(req, res);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    console.error('Update task error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task by ID
 * @access  Private
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedTask = await taskController.deleteTask(req, res);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({
      message: 'Task deleted successfully',
      task: deletedTask
    });
  } catch (error) {
    console.error('Delete task error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
