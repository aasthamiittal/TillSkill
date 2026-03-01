/**
 * Netlify Function: Main API (auth, courses, subscriptions, me, admin).
 * Proxied via /api/* -> /.netlify/functions/api
 */

const path = require('path');
const fs = require('fs');

// Backend path: Netlify puts included_files at the bundle root, so Backend may be next to this file
// or at repo root relative to cwd/__dirname. Try multiple candidates.
const backendCandidates = [
  path.join(__dirname, 'Backend'),
  path.resolve(__dirname, '../../Backend'),
  path.join(process.cwd(), 'Backend'),
];
const resolvedBackendPath = backendCandidates.find((p) => fs.existsSync(p)) || backendCandidates[0];

require('dotenv').config({ path: path.join(resolvedBackendPath, '../.env') });

let app = null;
let connectDb = null;
let serverless = null;
let dbReady = null;

function loadApp() {
  if (app) return;
  serverless = require('serverless-http');
  const db = require(path.join(resolvedBackendPath, 'src/lib/db'));
  connectDb = db.connectDb;
  app = require(path.join(resolvedBackendPath, 'src/app'));
}

async function ensureDb() {
  if (!connectDb) loadApp();
  if (!dbReady) {
    dbReady = connectDb();
  }
  return dbReady;
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };
}

module.exports.handler = async (event, context) => {
  try {
    loadApp();
  } catch (loadErr) {
    const message = loadErr && typeof loadErr.message === 'string' ? loadErr.message : 'Server configuration error';
    console.error('API load error:', message, loadErr);
    return jsonResponse(500, {
      message: 'Server configuration error',
      detail: message,
      debug: { resolvedBackendPath, exists: fs.existsSync(resolvedBackendPath) },
    });
  }

  try {
    await ensureDb();
  } catch (dbErr) {
    console.error('DB connection error:', dbErr.message || dbErr);
    return jsonResponse(500, {
      message: process.env.MONGO_URI ? 'Database connection failed' : 'Server misconfiguration: MONGO_URI not set',
      detail: dbErr && typeof dbErr.message === 'string' ? dbErr.message : undefined,
    });
  }

  try {
    const handler = serverless(app, {
      binary: ['application/json', 'multipart/form-data'],
    });
    return await handler(event, context);
  } catch (err) {
    console.error('API handler error:', err.message || err);
    return jsonResponse(500, { message: 'Internal server error' });
  }
};
