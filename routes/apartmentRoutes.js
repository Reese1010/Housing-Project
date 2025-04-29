// routes/apartmentRoutes.js
const express = require('express');
const router = express.Router();
const Apartment = require('../models/apartment');

// View all apartments
router.get('/', async (req, res) => {
  try {
    const apartments = await Apartment.find({}).lean();
    res.render('apartments', { apartments });
  } catch (error) {
    console.error('Error loading apartments:', error);
    res.render('apartments', { apartments: [] });
  }
});

// View single apartment
router.get('/:id', async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id).lean();
    if (!apartment) {
      return res.status(404).send('Apartment not found');
    }
    res.render('apartmentDetail', { apartment });
  } catch (error) {
    console.error('Error loading apartment:', error);
    res.status(500).send('Error loading apartment.');
  }
});

module.exports = router;