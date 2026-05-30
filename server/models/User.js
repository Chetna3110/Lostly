const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    // New fields for student authentication
    enrollmentNumber: {
      type: String,
      required: function() { return this.role === 'user'; },
      unique: true,
      sparse: true,
    },
    branch: {
      type: String,
      required: function() { return this.role === 'user'; },
    },
    year: {
      type: String,
      required: function() { return this.role === 'user'; },
    },
    phone: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);