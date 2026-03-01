const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentName: {
      type: String,
      trim: true,
    },
    studentEmail: {
      type: String,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    courseTitle: {
      type: String,
      trim: true,
    },
    courseSlug: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    wiseRemittanceDetails: String,
    status: {
      type: String,
      enum: ['pending', 'sent', 'paid', 'cancelled'],
      default: 'pending',
    },
    issuedAt: Date,
    paidAt: Date,
  },
  { timestamps: true }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;

