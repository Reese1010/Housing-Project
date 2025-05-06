const express = require('express');
const router = express.Router();
const Apartment = require('../models/apartment');

// View all apartments with filters
router.get('/', async (req, res) => {
  try {
    const { distance, minRent, maxRent, bedroomType, petPolicy, name } = req.query;

    // Build the filter query
    const query = {};

    // Filter by apartment name (case-insensitive substring)
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    // Filter by distance
    if (distance) {
      query.distanceToUniversity = { $lte: parseFloat(distance) };
    }

    // Filter by pet policy
    if (petPolicy) {
      query.petPolicy = petPolicy;
    }

    // Fetch all apartments to filter in-memory if necessary
    let apartments = await Apartment.find(query).lean();

    // Filter by rent and bedroomType manually
    apartments = apartments.filter(apartment => {
      const hasMatchingBedroom = apartment.bedrooms.some(bed => {
        const rent = bed.rent;
        const typeMatch = !bedroomType || bed.type === bedroomType;
        const rentMatch = (!minRent || (Array.isArray(rent) ? rent[0] >= minRent : rent >= minRent)) &&
                          (!maxRent || (Array.isArray(rent) ? rent[1] <= maxRent : rent <= maxRent));
        return typeMatch && rentMatch;
      });
      return hasMatchingBedroom;
    });

    // Dynamically extract unique bedroom types for the dropdown
    const bedroomTypesSet = new Set();
    apartments.forEach(apartment => {
      apartment.bedrooms.forEach(bed => bedroomTypesSet.add(bed.type));
    });
    const bedroomTypes = Array.from(bedroomTypesSet);

    res.render('apartments', {
      apartments,
      bedroomTypes,
      distance,
      minRent,
      maxRent,
      bedroomType,
      petPolicy,
      name
    });
  } catch (error) {
    console.error('Error loading apartments:', error);
    res.render('apartments', { apartments: [], bedroomTypes: [] });
  }
});

// View a single apartment detail page
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