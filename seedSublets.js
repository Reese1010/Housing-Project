const mongoose = require('mongoose');
require('dotenv').config();
const Sublease = require('./models/sublease');

const seedData = [
  {
    title: 'Summer Sublease 1BR - Close to Campus',
    description: 'Fully furnished, utilities included, 5 min walk to campus!',
    price: 900,
    apartmentName: 'University Crossing Apartments',
    user: new mongoose.Types.ObjectId(), // Fake ID for now
  },
  {
    title: 'Private Room Available - Quiet Area',
    description: 'Spacious room with private bathroom. Pet friendly!',
    price: 750,
    apartmentName: 'Rush Student Living',
    user: new mongoose.Types.ObjectId(), // Fake ID for now
  },
  {
    title: 'Shared 4BR Apartment - 1 Room Open',
    description: 'Fun roommates, amenities included, shuttle to UNCC.',
    price: 680,
    apartmentName: 'The Mill',
    user: new mongoose.Types.ObjectId(), // Fake ID for now
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');

    await Sublease.deleteMany({});
    console.log('Old subleases cleared.');

    await Sublease.insertMany(seedData);
    console.log('New subleases seeded!');

    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding sublets:', err);
    mongoose.connection.close();
  });