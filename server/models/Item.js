const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      enum: ['electronics', 'clothing', 'accessories', 'documents', 'keys', 'bags', 'books', 'other'],
      required: true,
    },
    type: {
      type: String,
      enum: ['lost', 'found'],
      required: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    images: [{
      type: String,
    }],
    status: {
      type: String,
      enum: ['active', 'resolved', 'pending_admin_review'],
      default: 'active',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Student details for authentication
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
    },
    enrollmentNumber: {
      type: String,
      required: [true, 'Enrollment number is required'],
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
    },
    contactPhone: {
      type: String,
      required: [true, 'Contact phone is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);