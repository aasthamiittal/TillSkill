const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const User = require('../models/user');

const router = express.Router();

const isNetlify = !!process.env.NETLIFY;
const upload = isNetlify
  ? multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } })
  : multer({
      dest: path.join(__dirname, '../uploads'),
      limits: { fileSize: 5 * 1024 * 1024 },
    });

function signToken(user) {
  const payload = { sub: user.id, role: user.role, email: user.email };
  const secret = process.env.JWT_SECRET || 'dev-secret';
  const expiresIn = '7d';
  return jwt.sign(payload, secret, { expiresIn });
}

// Student registration (JSON body; resume not supported on serverless)
router.post('/register', async (req, res, next) => {
  try {
    const body = req.body || {};
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password;
    const firstName = (body.firstName || '').trim();
    const lastName = (body.lastName || '').trim();
    const name = [firstName, lastName].filter(Boolean).join(' ') || body.name || '';
    const phone = (body.phone || '').trim();
    const contactAddress = (body.contactAddress || '').trim();
    const timezone = (body.timezone || '').trim();
    const streamOfEducation = (body.streamOfEducation || '').trim();
    const qualification = (body.qualification || '').trim();
    const courseInterest = (body.courseInterest || '').trim();
    const infoSessionId = (body.infoSessionId || '').trim();
    const englishComfortable = (body.englishComfortable || '').trim();

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      password,
      name: name || undefined,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      contactAddress: contactAddress || undefined,
      phone: phone || undefined,
      timezone: timezone || undefined,
      streamOfEducation: streamOfEducation || undefined,
      qualification: qualification || undefined,
      courseInterest: courseInterest || undefined,
      infoSessionId: infoSessionId || undefined,
      englishComfortable: englishComfortable || undefined,
      role: 'student',
    });

    const token = signToken(user);
    return res.status(201).json({
      token,
      user: { id: user.id, email: user.email, name: user.name || name, role: user.role },
    });
  } catch (err) {
    return next(err);
  }
});

// Corporate registration (JSON: organisation + contact person; no resume)
router.post('/register-corporate', async (req, res, next) => {
  try {
    const body = req.body || {};
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password;
    const organisationName = (body.organisationName || '').trim();
    const contactPersonName = (body.contactPersonName || '').trim();
    const phone = (body.phone || '').trim();
    const timezone = (body.timezone || '').trim();
    const corporateMessage = (body.message || '').trim();

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    if (!organisationName || !contactPersonName) {
      return res.status(400).json({ message: 'Organisation name and contact person name are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      password,
      name: contactPersonName,
      firstName: contactPersonName,
      lastName: '',
      organisationName: organisationName || undefined,
      contactPersonName: contactPersonName || undefined,
      phone: phone || undefined,
      timezone: timezone || undefined,
      corporateMessage: corporateMessage || undefined,
      role: 'corporate',
    });

    const token = signToken(user);
    return res.status(201).json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    return next(err);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let passwordOk = false;
    if (user.password !== undefined && user.password !== null) {
      passwordOk = user.password === password;
    } else if (user.passwordHash) {
      passwordOk = await bcrypt.compare(password, user.passwordHash);
    }
    if (!passwordOk) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);
    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

