const mongoose = require('mongoose');

/**
 * Schema for Task model
 * @type {mongoose.Schema}
 */
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,  // Minimum length of task title
    maxlength: 100 // Maximum length of task title
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500 // Maximum length of task description
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'], // Priority options
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'], // Status options
    default: 'Pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt timestamps
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
