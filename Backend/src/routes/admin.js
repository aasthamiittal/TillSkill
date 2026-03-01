const express = require('express');
const Course = require('../models/course');
const Terms = require('../models/terms');
const Enrollment = require('../models/enrollment');
const Certificate = require('../models/certificate');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All admin routes require admin role
router.use(auth('admin'));

// Manage course metadata (title, description, fee, Wise details, etc.)
router.post('/courses', async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
});

router.put('/courses/:id', async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.json(course);
  } catch (err) {
    return next(err);
  }
});

// Manage terms & conditions content (versioned per course)
router.post('/courses/:courseId/terms', async (req, res, next) => {
  try {
    // Optionally deactivate previous versions
    await Terms.updateMany(
      { forCourse: req.params.courseId, isActive: true },
      { $set: { isActive: false } }
    );

    const terms = await Terms.create({
      forCourse: req.params.courseId,
      version: req.body.version,
      content: req.body.content,
      isActive: true,
    });

    return res.status(201).json(terms);
  } catch (err) {
    return next(err);
  }
});

// Mark invoice as paid and activate enrollment
router.post('/enrollments/:id/mark-paid', async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('invoice');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (enrollment.invoice) {
      enrollment.invoice.status = 'paid';
      enrollment.invoice.paidAt = new Date();
      await enrollment.invoice.save();
    }

    enrollment.status = 'active';
    await enrollment.save();

    return res.json({ message: 'Enrollment marked as paid and activated' });
  } catch (err) {
    return next(err);
  }
});

// Issue a blockchain-backed certificate (stub for blockchain integration)
router.post('/enrollments/:id/issue-certificate', async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('student')
      .populate('course');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (enrollment.status !== 'completed' && enrollment.status !== 'active') {
      return res
        .status(400)
        .json({ message: 'Enrollment must be active or completed to issue certificate' });
    }

    const serialNumber = `TS-CERT-${Date.now()}`;

    // Here you would:
    // 1. Generate a PDF certificate document.
    // 2. Hash the PDF.
    // 3. Submit the hash to a blockchain network (e.g. Ethereum testnet or a dedicated cert chain).
    // 4. Store the transaction ID and document URL.

    const certificate = await Certificate.create({
      student: enrollment.student._id,
      course: enrollment.course._id,
      enrollment: enrollment._id,
      serialNumber,
      blockchainTxId: 'BLOCKCHAIN_TX_ID_STUB',
      documentUrl: req.body.documentUrl || '',
    });

    return res.status(201).json({
      message:
        'Certificate issued. Blockchain anchoring is stubbed; integrate with your chain of choice in this endpoint.',
      certificate,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

