const mongoose = require('mongoose');

const termsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      default: 'default',
    },
    version: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    forCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Terms = mongoose.model('Terms', termsSchema);

module.exports = Terms;

