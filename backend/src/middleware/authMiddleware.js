const jwt = require('jsonwebtoken');

function getTokenFromRequest(req) {
  const authHeader = req.headers && req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  if (req.body && req.body.token) return req.body.token;
  if (req.query && req.query.token) return req.query.token;
  return null;
}

function authenticateToken(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

module.exports = { authenticateToken, getTokenFromRequest };