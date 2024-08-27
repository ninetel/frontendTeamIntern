// middleware/authMiddleWare.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '');

  if (!accessToken) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid accessToken' });
    req.user = user;
    next();
  });
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  };
};

module.exports = { authenticateJWT, requireRole };
