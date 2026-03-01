const mongoose = require('mongoose');

async function connectDb() {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME || 'Tillskill';

  if (!uri) {
    throw new Error('MONGO_URI is not set in environment');
  }

  await mongoose.connect(uri, {
    dbName,
  });

  // eslint-disable-next-line no-console
  console.log(`Connected to MongoDB database "${dbName}"`);
}

module.exports = { connectDb };

