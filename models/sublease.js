const mongoose = require('mongoose');

const subleaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  apartmentName: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  datePosted: { type: Date, default: Date.now },
  image: { type: String } 
}, {
  collection: 'subleases'
});

module.exports = mongoose.model('Sublease', subleaseSchema);