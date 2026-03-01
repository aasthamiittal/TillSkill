const jwt = require('jsonwebtoken');
const User = require('../models/user');

function auth(requiredRole) {
  return async function authMiddleware(req, res, next) {
    try {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;

      if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
      const user = await User.findById(payload.sub);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = user;
      req.userId = user._id;
      return next();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = { auth };

