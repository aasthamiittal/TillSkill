/**
 * Netlify Function: Main API (auth, courses, subscriptions, me, admin).
 * Proxied via /.netlify/functions/api - use redirect /api/* -> this in netlify.toml.
 */

const serverless = require('serverless-http');
const path = require('path');

// Resolve Backend from project root (Netlify runs from repo root)
const backendPath = path.resolve(__dirname, '../../Backend');
require('dotenv').config({ path: path.join(backendPath, '../.env') });

const { connectDb } = require(path.join(backendPath, 'src/lib/db'));
const app = require(path.join(backendPath, 'src/app'));

let dbReady = null;

async function ensureDb() {
  if (!dbReady) {
    dbReady = connectDb();
  }
  return dbReady;
}

const handler = serverless(app, {
  binary: ['application/json', 'multipart/form-data'],
});

module.exports.handler = async (event, context) => {
  try {
    await ensureDb();
    return await handler(event, context);
  } catch (err) {
    console.error('API function error:', err.message || err);
    const message = !process.env.MONGO_URI
      ? 'Server misconfiguration: database not configured'
      : 'Internal server error';
    return {
      statusCode: 500,
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
