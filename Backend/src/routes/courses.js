const express = require('express');
const Course = require('../models/course');
const Terms = require('../models/terms');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Public: list active courses
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find({ isActive: true }).lean();
    res.json(courses);
  } catch (err) {
    next(err);
  }
});

// Public: get course + active terms
router.get('/:slug', async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, isActive: true }).lean();
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const terms = await Terms.findOne({
      forCourse: course._id,
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ course, terms });
  } catch (err) {
    return next(err);
  }
});

// Protected: student accepts terms for a course (used in long-term flow)
router.post('/:slug/accept-terms', auth('student'), async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, isActive: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const terms = await Terms.findOne({
      forCourse: course._id,
      isActive: true,
    }).sort({ createdAt: -1 });

    if (!terms) {
      return res.status(400).json({ message: 'No active terms configured for this course' });
    }

    // Here we would create or update an Enrollment record to mark that the student
    // has accepted the terms and trigger ERP/invoice generation.
    // This keeps the "autogenerate invoice" logic on the backend, not in the browser.

    return res.json({
      message: 'Terms accepted; invoice generation and ERP integration will be handled server-side.',
      termsVersion: terms.version,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

