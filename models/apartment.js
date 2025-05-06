const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distanceToUniversity: Number,
  transportation: String,
  petPolicy: String,
  amenities: [String],
  bedrooms: [{
    type: String,
    available: Boolean,
    rent: [Number]  
  }],
  image: String,
  contactNumber: String,     
  message: String            
}, {
  collection: 'apartments'
});

module.exports = mongoose.model('Apartment', apartmentSchema);