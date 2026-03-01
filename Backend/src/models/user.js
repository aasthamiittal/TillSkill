const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // WARNING: Password is stored in plain text at your request.
    // Not recommended for production.
    password: {
      type: String,
      required: false,
    },
    // Legacy: hashed password (from older seed/versions); login supports both.
    passwordHash: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      trim: true,
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    role: {
      type: String,
      enum: ['student', 'corporate', 'admin'],
      default: 'student',
    },
    contactAddress: String,
    phone: String,
    timezone: String,
    organisationName: String,
    contactPersonName: String,
    streamOfEducation: String,
    qualification: String,
    courseInterest: String,
    infoSessionId: String,
    englishComfortable: String,
    resumePath: String,
    corporateMessage: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

