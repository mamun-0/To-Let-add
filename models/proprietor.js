const mongoose = require('mongoose');
const { Schema } = mongoose;

const proprietorSchema = new Schema({
  buildingName: { type: String, required: true },
  buildingType: { type: String, required: true },
  seatAvailability: { type: Number, required: true },
  onlyFor: { type: String, required: true },
  contact: {
    type: String,
    minLength: [11, 'Phone number must be eleven digits'],
  },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Proprietor', proprietorSchema);
