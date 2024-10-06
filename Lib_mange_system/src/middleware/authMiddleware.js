const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not auth, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not auth, no token' });
  }
};


const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access is not , not an Admin' });
  }
};

module.exports = { protect, admin };
