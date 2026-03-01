require('dotenv').config();

const { connectDb } = require('./lib/db');
const User = require('./models/user');
const Course = require('./models/course');
const Terms = require('./models/terms');

async function seed() {
  await connectDb();

  // 1. Ensure one admin user exists
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@tillskill.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      email: adminEmail,
      password: adminPassword,
      name: 'Tillskill Admin',
      role: 'admin',
    });
    // eslint-disable-next-line no-console
    console.log(`Created admin user: ${adminEmail} / ${adminPassword}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  // 2. Optional: test student (set SEED_STUDENT_EMAIL and SEED_STUDENT_PASSWORD in .env to create)
  const studentEmail = process.env.SEED_STUDENT_EMAIL;
  const studentPassword = process.env.SEED_STUDENT_PASSWORD;
  if (studentEmail && studentPassword) {
    let student = await User.findOne({ email: studentEmail });
    if (!student) {
      student = await User.create({
        email: studentEmail,
        password: studentPassword,
        name: 'Test Student',
        role: 'student',
      });
      // eslint-disable-next-line no-console
      console.log(`Created test student: ${studentEmail}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`Test student already exists: ${studentEmail}`);
    }
  }

  // 3. Seed core courses (slugs aligned with frontend)
  const coursesToSeed = [
    {
      slug: 'us-cma',
      title: 'US CMA with Tillskill™',
      type: 'long',
      description: '2-part global management accounting qualification.',
      feeAmount: 0,
      currency: 'USD',
    },
    {
      slug: 'fmaa',
      title: 'FMAA with Tillskill™',
      type: 'long',
      description: 'Foundational Management Accounting and Analytics pathway.',
      feeAmount: 0,
      currency: 'USD',
    },
    {
      slug: 'csca',
      title: 'CSCA-focused learning with Tillskill™',
      type: 'long',
      description: 'Strategy and competitive analysis focus.',
      feeAmount: 0,
      currency: 'USD',
    },
    {
      slug: 'excel',
      title: 'Excel and Finance with Tillskill™',
      type: 'short',
      description: 'Hands-on spreadsheet skills for finance roles.',
      feeAmount: 0,
      currency: 'USD',
    },
    {
      slug: 'intro',
      title: 'Intro Sessions / CPE',
      type: 'short',
      description: 'FREE introductory webinars and single-session courses.',
      feeAmount: 0,
      currency: 'USD',
    },
  ];

  for (const data of coursesToSeed) {
    const existing = await Course.findOne({ slug: data.slug });
    if (existing) {
      // eslint-disable-next-line no-console
      console.log(`Course already exists: ${data.slug}`);
      continue;
    }
    const course = await Course.create(data);
    // eslint-disable-next-line no-console
    console.log(`Created course: ${course.slug}`);
  }

  // 4. Seed a default Terms & Conditions for each course (can be edited later via admin API)
  const courses = await Course.find({});
  for (const course of courses) {
    const hasTerms = await Terms.findOne({ forCourse: course._id, isActive: true });
    if (hasTerms) {
      // eslint-disable-next-line no-console
      console.log(`Active terms already exist for course: ${course.slug}`);
      continue;
    }

    const terms = await Terms.create({
      forCourse: course._id,
      version: 'v1',
      content:
        'These are placeholder Terms & Conditions for this course. Please update via the admin panel before going live.',
      isActive: true,
    });
    // eslint-disable-next-line no-console
    console.log(`Created default terms for course: ${course.slug} (version ${terms.version})`);
  }

  // eslint-disable-next-line no-console
  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Seeding failed', err);
  process.exit(1);
});

