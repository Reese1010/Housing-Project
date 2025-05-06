const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// GET /login
router.get('/', (req, res) => {
  res.render('login', { error_msg: null, success_msg: null });
});

// GET /login/register
router.get('/register', (req, res) => {
  res.render('register', { error_msg: null, success_msg: null });
});

// POST /login
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('login', {
        error_msg: 'Invalid username or password.',
        success_msg: null
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', {
        error_msg: 'Invalid username or password.',
        success_msg: null
      });
    }

    req.session.userId = user._id;
    res.redirect('/profile');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', {
      error_msg: 'Something went wrong. Try again later.',
      success_msg: null
    });
  }
});

// POST /login/register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render('register', {
        error_msg: 'Username or email already exists.',
        success_msg: null
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.render('login', {
      success_msg: 'Account created successfully. Please login.',
      error_msg: null
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.render('register', {
      error_msg: 'Failed to create account.',
      success_msg: null
    });
  }
});

// GET /logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.redirect('/profile');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;