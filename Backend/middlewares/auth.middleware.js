const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  }

  module.exports = {
    authenticateToken
  }
