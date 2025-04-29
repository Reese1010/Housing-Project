const mongoose = require('mongoose');

const bedroomSchema = new mongoose.Schema({
    type: String,
    available: Boolean,
    rent: [Number] 
});

const apartmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    distanceToUniversity: Number,
    transportation: String,
    petPolicy: String,
    amenities: [String],
    bedrooms: [bedroomSchema]
});

module.exports = mongoose.model('Apartment', apartmentSchema);
