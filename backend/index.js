/**
 * Server setup and configuration
 */

const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

/**
 * Load environment variables from .env file
 */
dotenv.config();

/**
 * Create an instance of the Express app
 */
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use task routes
app.use('/api/tasks', taskRoutes);

// Route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Catch-all route for 404 errors
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server startup errors
server.on('error', (err) => {
  console.error('Error starting server:', err);
});
