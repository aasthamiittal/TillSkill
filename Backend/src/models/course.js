const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['short', 'long'],
      required: true,
    },
    description: String,
    feeAmount: Number,
    currency: {
      type: String,
      default: 'USD',
    },
    wiseRemittanceDetails: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

