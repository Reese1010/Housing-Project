const express = require('express');
const router = express.Router();

// GET /logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.redirect('/profile');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;