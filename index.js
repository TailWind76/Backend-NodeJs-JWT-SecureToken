const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'your-secret-key';

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

app.get('/protected', authenticateToken, (req, res) => {
  return res.json({ message: 'You have access to the protected resource' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
