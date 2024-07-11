const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Connect to MongoDB database.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // The following options are deprecated and can be removed
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
