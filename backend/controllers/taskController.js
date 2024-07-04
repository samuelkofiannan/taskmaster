/**
 * Task controller
 *
 * Handles CRUD operations for tasks
 */

const Task = require('../models/taskModel');

/**
 * Get all tasks
 *
 * Retrieves all tasks from the database
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllTasks = async (req, res) => {
  try {
    /**
     * Retrieve all tasks from the database
     */
    const tasks = await Task.getAllTasks();
    res.json(tasks);
  } catch (err) {
    /**
     * Log error and send 500 response
     */
    console.error(err);
    res.status(500).send({ message: 'Error fetching tasks' });
  }
};

/**
 * Create a new task
 *
 * Creates a new task in the database
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;

  /**
   * Validate task data
   */
  if (!title || !description || !status) {
    return res.status(400).send({ message: 'Invalid task data' });
  }

  try {
    /**
     * Create a new task in the database
     */
    const taskId = await Task.createTask({ title, description, status });
    res.status(201).json({ id: taskId, title, description, status });
  } catch (err) {
    /**
     * Log error and send 500 response
     */
    console.error(err);
    res.status(500).send({ message: 'Error creating task' });
  }
};

/**
 * Update an existing task
 *
 * Updates an existing task in the database
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  /**
   * Validate task data
   */
  if (!title || !description || !status) {
    return res.status(400).send({ message: 'Invalid task data' });
  }

  try {
    /**
     * Update the task in the database
     */
    await Task.updateTask(taskId, { title, description, status });
    res.json({ id: taskId, title, description, status });
  } catch (err) {
    /**
     * Log error and send 500 response
     */
    console.error(err);
    res.status(500).send({ message: 'Error updating task' });
  }
};

/**
 * Delete a task
 *
 * Deletes a task from the database
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    /**
     * Delete the task from the database
     */
    await Task.deleteTask(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    /**
     * Log error and send 500 response
     */
    console.error(err);
    res.status(500).send({ message: 'Error deleting task' });
  }
};
