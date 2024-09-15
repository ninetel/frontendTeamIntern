// middlewares/checkReferrer.js

const allowedOrigins = ['http://localhost:3004', 'http://localhost:3005'];

const checkReferrer = (req, res, next) => {
  const referrer = req.get('Referrer');
  if (referrer && allowedOrigins.some(origin => referrer.startsWith(origin))) {
    next();
  } else {
    res.status(403).send('Access denied');
  }
};

module.exports = checkReferrer;
