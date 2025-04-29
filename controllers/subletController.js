const Sublease = require('../models/sublease');

exports.viewSublets = async (req, res) => {
  try {
    const subleases = await Sublease.find({});
    res.render('sublet', { subleases });
  } catch (error) {
    console.error('Error loading sublets:', error);
    res.status(500).send('Error loading sublets');
  }
};

exports.showCreateSubletForm = (req, res) => {
  res.render('create_new_listing');
};

exports.createSublet = async (req, res) => {
  try {
    const { username, email, description } = req.body;
    const newSublet = new Sublease({ username, email, description });
    await newSublet.save();
    res.redirect('/sublet');
  } catch (error) {
    console.error('Error creating sublet:', error);
    res.status(500).send('Error creating sublet');
  }
};