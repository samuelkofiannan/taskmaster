const db = require('../config/dbConfig');

/**
 * Task model for managing tasks in the database
 */
const Task = {
  /**
   * Get all tasks from the database
   * @param {function} callback - The callback function to be called when the query is complete
   */
  getAllTasks: (callback) => {
    try {
      const query = 'SELECT * FROM tasks';
      db.query(query, (err, results) => {
        if (err) {
          console.error(`Error retrieving tasks: ${err}`);
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    } catch (error) {
      console.error(`Error in getAllTasks: ${error}`);
      callback(error, null);
    }
  },

  /**
   * Create a new task in the database
   * @param {object} task - The task object containing the title, description, and status properties
   * @param {function} callback - The callback function to be called when the query is complete
   */
  createTask: (task, callback) => {
    try {
      if (!task ||!task.title ||!task.description ||!task.status) {
        return callback({ message: 'Invalid task object' }, null);
      }

      const escapedTask = [
        task.title,
        task.description,
        task.status,
      ].map((property) => db.escape(property));

      const query = `INSERT INTO tasks (title, description, status) VALUES (${escapedTask.join(',')})`;
      db.query(query, (err, result) => {
        if (err) {
          console.error(`Error creating task: ${err}`);
          callback(err, null);
        } else {
          callback(null, result.insertId);
        }
      });
    } catch (error) {
      console.error(`Error in createTask: ${error}`);
      callback(error, null);
    }
  },

  //... other methods...
};

module.exports = Task;
