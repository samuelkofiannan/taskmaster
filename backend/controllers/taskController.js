const Task = require('../models/taskModel');

/**
 * Create a new task.
 * @param {Object} req - The request object containing task details.
 * @param {Object} res - The response object to send the result.
 * @returns {void}
 */
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description, user: req.user.userId });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get all tasks for the authenticated user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 * @returns {void}
 */
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get a task by ID.
 * @param {Object} req - The request object containing task ID.
 * @param {Object} res - The response object to send the result.
 * @returns {void}
 */
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error getting task:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Update a task by ID.
 * @param {Object} req - The request object containing task ID and updated details.
 * @param {Object} res - The response object to send the result.
 * @returns {void}
 */
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Delete a task by ID.
 * @param {Object} req - The request object containing task ID.
 * @param {Object} res - The response object to send the result.
 * @returns {void}
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
