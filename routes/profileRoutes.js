const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Sublease = require('../models/sublease');

// Middleware to protect this route
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// GET /profile
router.get('/', requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).lean();
    const subleases = await Sublease.find({ user: user._id }).lean();

    res.render('profile', { user, subleases });
  } catch (error) {
    console.error('Error loading profile:', error);
    res.status(500).send('Error loading profile page.');
  }
});

module.exports = router;