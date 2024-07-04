/**
 * This module exports a function that creates a MySQL database connection and creates a table if it doesn't exist.
 * @module dbConfig
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * This object contains the configuration for the MySQL database connection.
 * @type {Object}
 * @property {string} host - The hostname of the MySQL server.
 * @property {string} user - The username to use for the MySQL connection.
 * @property {string} password - The password to use for the MySQL connection.
 * @property {string} database - The name of the MySQL database to connect to.
 */
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

/**
 * This function creates a MySQL table if it doesn't exist.
 * @function
 * @param {mysql.Connection} db - The MySQL database connection object.
 * @returns {Promise<void>} A promise that resolves when the table is created.
 */
async function createTable(db) {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(255) NOT NULL
    )
  `;
  try {
    await db.execute(query);
    console.log('Table created successfully.');
  } catch (err) {
    console.error(`Error creating table: ${err.message}`);
    throw err;
  }
}

/**
 * This function creates a MySQL database connection and creates a table if it doesn't exist.
 * @function
 * @returns {Promise<void>} A promise that resolves when the database connection is closed.
 */
async function main() {
  try {
    const db = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
    });
    await createTable(db);
    await db.end();
    console.log('Database connection closed.');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

// Export the main function as the default export of this module.
module.exports = main;
