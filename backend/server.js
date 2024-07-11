const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler, notFoundHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

// Log environment variables for verification
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

/**
 * Establish MongoDB connection.
 */
connectDB();

const app = express();
app.use(express.json());

/**
 * Define routes for authentication and tasks.
 */
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

/**
 * Middleware for handling 404 Not Found errors.
 */
app.use(notFoundHandler);

/**
 * Middleware for handling other errors.
 */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

/**
 * Start the server and listen on the specified port.
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
