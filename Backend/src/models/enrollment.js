const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
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
    type: {
      type: String,
      enum: ['short', 'long'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'awaiting_payment', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    termsVersionAccepted: String,
    acceptedAt: Date,
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },
    paymentProofUrl: String,
  },
  { timestamps: true }
);

// Fast lookup: "all enrollments for this user"
enrollmentSchema.index({ student: 1, createdAt: -1 });

// Lookup: "does this user already have this course+type?" (duplicate prevention in app logic)
enrollmentSchema.index({ student: 1, course: 1, type: 1 });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;

