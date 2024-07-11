/**
 * Middleware to handle errors in the Express application.
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error stack:', err.stack);
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal Server Error', 
    stack: process.env.NODE_ENV === 'production' ? null : err.stack 
  });
};

/**
 * Middleware to handle 404 Not Found errors in the Express application.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
