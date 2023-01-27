const mongoose = require('mongoose');
const { Schema } = mongoose;

const proprietorSchema = new Schema({
  buildingName: String,
  buildingType: String,
  author:{
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  seatAvailability: Number,
  onlyFor: String,
  contact: String,
  image: {
    path : String,
    filename : String
  },
  description: String,
});

module.exports = mongoose.model('Proprietor', proprietorSchema);
