const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schema for User model
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,  // Minimum length of username
    maxlength: 30  // Maximum length of username
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v); // Email format validation
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum length of password
  },
  profilePicture: {
    type: String,
    default: 'default-profile-picture.png' // Default profile picture if none provided
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt timestamps
});

/**
 * Hash the user's password before saving
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next(); // Skip hashing if password is not modified
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

/**
 * Compare the given password with the hashed password
 * @param {string} candidatePassword - The password to compare
 * @returns {Promise<boolean>} - Returns true if passwords match, false otherwise
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Compare passwords
};

const User = mongoose.model('User', userSchema);

module.exports = User;
