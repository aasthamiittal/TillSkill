const express = require('express');
const Enrollment = require('../models/enrollment');
const Invoice = require('../models/invoice');
const Course = require('../models/course');
const { auth } = require('../middleware/auth');
const { isConfigured: isStripeConfigured, createCheckoutSessionForEnrollment } = require('../lib/stripe');

const router = express.Router();

const frontendOrigin = () => process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// Short-term: create enrollment and Stripe Checkout URL when Stripe is configured
router.post('/short/:slug', auth('student'), async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, type: 'short', isActive: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const existing = await Enrollment.findOne({
      student: req.userId,
      course: course._id,
      type: 'short',
    });
    if (existing) {
      const payload = { enrollmentId: existing.id, message: 'Already enrolled in this course' };
      if (existing.status === 'awaiting_payment' && isStripeConfigured()) {
        try {
          const checkoutUrl = await createCheckoutSessionForEnrollment(existing, course, frontendOrigin());
          if (checkoutUrl) payload.checkoutUrl = checkoutUrl;
        } catch (e) {
          // ignore
        }
      }
      return res.json(payload);
    }

    const enrollment = await Enrollment.create({
      student: req.userId,
      studentName: req.user.name || req.user.email,
      studentEmail: req.user.email,
      course: course._id,
      courseTitle: course.title,
      courseSlug: course.slug,
      type: 'short',
      status: 'awaiting_payment',
    });

    let checkoutUrl = null;
    if (isStripeConfigured()) {
      try {
        checkoutUrl = await createCheckoutSessionForEnrollment(enrollment, course, frontendOrigin());
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Stripe Checkout creation failed', err);
      }
    }

    return res.status(201).json({
      enrollmentId: enrollment.id,
      checkoutUrl: checkoutUrl || undefined,
      message: checkoutUrl
        ? 'Redirect the student to the payment URL to complete payment.'
        : 'Enrollment created. Payment can be made online when configured.',
    });
  } catch (err) {
    return next(err);
  }
});

// Long-term: ERP-style invoice generation flow
router.post('/long/:slug/initiate', auth('student'), async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, type: 'long', isActive: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const existing = await Enrollment.findOne({
      student: req.userId,
      course: course._id,
      type: 'long',
    });

    if (existing) {
      return res.json({ message: 'Enrollment already exists', enrollmentId: existing.id });
    }

    // Generate a simple invoice number; in production this would come from ERP
    const invoiceNumber = `TS-${Date.now()}`;

    const invoice = await Invoice.create({
      number: invoiceNumber,
      student: req.userId,
      studentName: req.user.name || req.user.email,
      studentEmail: req.user.email,
      course: course._id,
      courseTitle: course.title,
      courseSlug: course.slug,
      amount: course.feeAmount || 0,
      currency: course.currency || 'USD',
      wiseRemittanceDetails: course.wiseRemittanceDetails,
      status: 'sent',
      issuedAt: new Date(),
    });

    const enrollment = await Enrollment.create({
      student: req.userId,
      studentName: req.user.name || req.user.email,
      studentEmail: req.user.email,
      course: course._id,
      courseTitle: course.title,
      courseSlug: course.slug,
      type: 'long',
      status: 'awaiting_payment',
      invoice: invoice._id,
    });

    // At this point, this backend could call out to an external ERP API
    // and sync the invoice there. That integration is intentionally left
    // as a separate module so credentials stay on the server.

    return res.status(201).json({
      enrollmentId: enrollment.id,
      invoiceNumber: invoice.number,
      wiseRemittanceDetails: invoice.wiseRemittanceDetails,
      message:
        'Invoice generated. Student should remit fees using the remittance details and upload proof.',
    });
  } catch (err) {
    return next(err);
  }
});

// Create Stripe Checkout URL for an existing short-term enrollment (Pay now from My Courses)
router.post('/enrollment/:enrollmentId/checkout-session', auth('student'), async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.enrollmentId).populate('course');
    if (!enrollment || !enrollment.student.equals(req.userId)) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    if (enrollment.type !== 'short' || enrollment.status !== 'awaiting_payment') {
      return res.status(400).json({ message: 'This enrollment cannot be paid online' });
    }
    const course = enrollment.course;
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!isStripeConfigured()) {
      return res.status(503).json({ message: 'Online payment is not configured' });
    }
    const checkoutUrl = await createCheckoutSessionForEnrollment(enrollment, course, frontendOrigin());
    if (!checkoutUrl) {
      return res.status(400).json({ message: 'No payment required for this course' });
    }
    return res.json({ checkoutUrl });
  } catch (err) {
    return next(err);
  }
});

// Student uploads proof of payment for manual verification
router.post('/:enrollmentId/payment-proof', auth('student'), async (req, res, next) => {
  try {
    const { proofUrl } = req.body;
    const enrollment = await Enrollment.findById(req.params.enrollmentId);
    if (!enrollment || !enrollment.student.equals(req.userId)) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.paymentProofUrl = proofUrl;
    await enrollment.save();

    return res.json({
      message: 'Payment proof uploaded. Admin will verify and activate enrollment.',
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

