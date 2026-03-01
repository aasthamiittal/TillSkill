/**
 * Netlify Function: Main API (auth, courses, subscriptions, me, admin).
 * Proxied via /api/* -> /.netlify/functions/api
 */

const path = require('path');

const backendPath = path.resolve(__dirname, '../../Backend');
require('dotenv').config({ path: path.join(backendPath, '../.env') });

let app = null;
let connectDb = null;
let serverless = null;
let dbReady = null;

function loadApp() {
  if (app) return;
  serverless = require('serverless-http');
  const db = require(path.join(backendPath, 'src/lib/db'));
  connectDb = db.connectDb;
  app = require(path.join(backendPath, 'src/app'));
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
    console.error('API load error:', loadErr.message || loadErr);
    return jsonResponse(500, {
      message: 'Server configuration error',
      detail: process.env.NODE_ENV === 'development' ? loadErr.message : undefined,
    });
  }

  try {
    await ensureDb();
  } catch (dbErr) {
    console.error('DB connection error:', dbErr.message || dbErr);
    return jsonResponse(500, {
      message: process.env.MONGO_URI ? 'Database connection failed' : 'Server misconfiguration: MONGO_URI not set',
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
