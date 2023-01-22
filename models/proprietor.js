const { string, number } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const proprietorSchema = new Schema({
  buildingName: String,
  buildingType: String,
  seatAvailability: Number,
  onlyFor: String,
  contact: String,
  image: String,
  description: String,
});

module.exports = mongoose.model('Proprietor', proprietorSchema);
