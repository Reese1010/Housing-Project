const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Sublease = require('../models/sublease');
const methodOverride = require('method-override');

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Allow method override
router.use(methodOverride('_method'));

// View all subleases
router.get('/', async (req, res) => {
  try {
    const subleases = await Sublease.find({}).populate('user').lean();
    res.render('sublet', { subleases });
  } catch (error) {
    console.error('Error fetching subleases:', error);
    res.status(500).send('Error loading subleases.');
  }
});

// Create new sublease form
router.get('/new', (req, res) => {
  res.render('newSublet');
});

// Create new sublease POST
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, apartmentName } = req.body;
    const userId = req.session.userId; 

    if (!userId) {
      req.flash('error_msg', 'You must be logged in to post.');
      return res.redirect('/login');
    }

    const newSublease = new Sublease({
      title,
      description,
      price,
      apartmentName,
      user: userId,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    });

    await newSublease.save();
    req.flash('success_msg', 'Sublease posted successfully!');
    res.redirect('/sublet');
  } catch (error) {
    console.error('Error posting sublease:', error);
    req.flash('error_msg', 'Failed to create sublease.');
    res.redirect('/sublet/new');
  }
});

// View single sublease
router.get('/:id', async (req, res) => {
    try {
      const sublease = await Sublease.findById(req.params.id).populate('user').lean();
      if (!sublease) {
        return res.status(404).send('Sublease not found');
      }
      res.render('subletDetail', { sublease, userId: req.session.userId });
    } catch (error) {
      console.error('Error fetching sublease:', error);
      res.status(500).send('Error loading sublease.');
    }
  });

// Delete sublease
router.delete('/:id', async (req, res) => {
  try {
    const sublease = await Sublease.findById(req.params.id);

    if (!sublease) {
      return res.status(404).send('Sublease not found');
    }

    if (!req.session.userId || sublease.user.toString() !== req.session.userId) {
      return res.status(403).send('Unauthorized');
    }

    await Sublease.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Sublease deleted successfully!');
    res.redirect('/sublet');
  } catch (error) {
    console.error('Error deleting sublease:', error);
    res.status(500).send('Error deleting sublease.');
  }
});

// GET: Show edit form
router.get('/:id/edit', async (req, res) => {
  try {
    const sublease = await Sublease.findById(req.params.id).lean();
    if (!sublease) return res.status(404).send('Sublease not found');
    if (!req.session.userId || sublease.user.toString() !== req.session.userId) {
      req.flash('error_msg', 'Unauthorized');
      return res.redirect('/sublet');
    }
    res.render('editSublet', { sublease });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT: Handle form submission
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const sublease = await Sublease.findById(req.params.id);
    if (!sublease || sublease.user.toString() !== req.session.userId) {
      req.flash('error_msg', 'Unauthorized or not found');
      return res.redirect('/sublet');
    }

    sublease.title = req.body.title;
    sublease.description = req.body.description;
    sublease.price = req.body.price;
    sublease.apartmentName = req.body.apartmentName;
    if (req.file) {
      sublease.image = `/uploads/${req.file.filename}`;
    }

    await sublease.save();
    req.flash('success_msg', 'Sublease updated!');
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Update failed.');
    res.redirect('/sublet');
  }
});

module.exports = router;