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
  await ensureDb();
  return handler(event, context);
};
