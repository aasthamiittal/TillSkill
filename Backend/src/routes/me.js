const express = require('express');
const Enrollment = require('../models/enrollment');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth());

// GET /api/me/enrollments – list current user's enrollments only (strictly scoped by authenticated user)
router.get('/enrollments', async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const enrollments = await Enrollment.find({ student: userId })
      .populate('course', 'title slug')
      .populate('invoice', 'number')
      .sort({ createdAt: -1 })
      .lean();

    const result = enrollments.map((e) => ({
      _id: e._id,
      studentId: e.student && e.student.toString(),
      courseTitle: e.courseTitle || (e.course && e.course.title),
      courseSlug: e.courseSlug || (e.course && e.course.slug),
      type: e.type,
      status: e.status,
      invoiceNumber: e.invoice && e.invoice.number,
      createdAt: e.createdAt,
    }));

    return res.json({ enrollments: result, userId: userId.toString() });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
