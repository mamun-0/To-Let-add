const mongoose = require('mongoose');
const Proprietor = require('../models/proprietor');

mongoose.connect('mongodb://localhost:27017/toLet').then(() => {
  console.log('Database connected');
});

const proprietorArr = [
  {
    buildingName: 'Doctor Bari Mess',
    buildingType: 'Mess',
    author: '63d21c9b06c88b264c356351',
    seatAvailability: 21,
    onlyFor: 'Male',
    contact: '+8801798668299',
    image:
      'https://images.unsplash.com/photo-1628592102751-ba83b0314276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1097&q=80',
    description:
      'Good mess for medium or specialy for poor people. Thanks for owner',
  },
  {
    buildingName: 'White House Mess',
    buildingType: 'Mess',
    author: '63d21c9b06c88b264c356351',
    seatAvailability: 30,
    onlyFor: 'Male',
    contact: '+8801798668299',
    image:
      'https://images.unsplash.com/photo-1628592102751-ba83b0314276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1097&q=80',
    description:
      'Good mess for medium or specialy for poor people. Thanks for owner',
  },
  {
    buildingName: 'Green House Mess',
    buildingType: 'Mess',
    author: '63d21c9b06c88b264c356351',
    seatAvailability: 13,
    onlyFor: 'Male',
    contact: '+8801798668299',
    image:
      'https://images.unsplash.com/photo-1628592102751-ba83b0314276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1097&q=80',
    description:
      'Good mess for medium or specialy for poor people. Thanks for owner',
  },
  {
    buildingName: 'Walton Building',
    buildingType: 'Flat',
    author: '63d21c9b06c88b264c356351',
    seatAvailability: 17,
    onlyFor: 'Male',
    contact: '+8801798668299',
    image:
      'https://images.unsplash.com/photo-1628592102751-ba83b0314276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1097&q=80',
    description:
      'Good mess for medium or specialy for poor people. Thanks for owner',
  },
  {
    buildingName: 'Blue House',
    buildingType: 'Mess',
    author: '63d21c9b06c88b264c356351',
    seatAvailability: 14,
    onlyFor: 'Male',
    contact: '+8801798668288',
    image:
      'https://images.unsplash.com/photo-1674421338672-3591ba6f176e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
    description: `Blue House is named as the house of south korea's prime minister house.`,
  },
];

async function seed() {
  await Proprietor.deleteMany({});
  await Proprietor.insertMany(proprietorArr);
  mongoose.connection.close();
}
seed();
