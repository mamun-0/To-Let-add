const mongoose = require('mongoose');
const Proprietor = require('../models/proprietor');

mongoose.connect('mongodb://localhost:27017/toLet').then(() => {
  console.log('Database connected');
});

const proprietorArr = [
  {
    buildingName: 'Doctor Bari',
    buildingType: 'Mess',
    author: '63d21c9b06c88b264c356351',
    seatAvailability: 10,
    onlyFor: 'Male',
    contact: '+8801798668299',
    image: {
      path: 'https://res.cloudinary.com/dcyo5k7zd/image/upload/v1674835638/to-Let/xldxmpii7crrsdivmcni.jpg',
      filename: 'to-Let/xldxmpii7crrsdivmcni',
    },
    description: 'Good mess for students. I hope you like it.',
  },
  {
    buildingName: 'White House',
    buildingType: 'Mess',
    author: '63d21c9b06c88b264c356351',
    seatAvailability: 8,
    onlyFor: 'Male',
    contact: '+8801798668299',
    image: {
      path: 'https://res.cloudinary.com/dcyo5k7zd/image/upload/v1674835935/to-Let/pp7hab2o4pejxlmvwmvo.jpg',
      filename: 'to-Let/pp7hab2o4pejxlmvwmvo',
    },
    description: `Good mess for students. I hope you like it.
                  One think you may dislike, supply water form ponds.
                  CCTV camera and 24/7 security guard notice.`,
  },
  {
    buildingName: 'Green House',
    buildingType: 'Mess',
    author: '63d2235bd4812903fa1ce3b2',
    seatAvailability: 5,
    onlyFor: 'Male',
    contact: '+8801798668299',
    image: {
      path: 'https://res.cloudinary.com/dcyo5k7zd/image/upload/v1674836280/to-Let/hostuomuh0h8xdb6mbsz.avif',
      filename: 'to-Let/hostuomuh0h8xdb6mbsz',
    },
    description: `Better than the best. I'm so confident that you love it.`,
  },
];

async function seed() {
  await Proprietor.deleteMany({});
  await Proprietor.insertMany(proprietorArr);
  mongoose.connection.close();
}
seed();
