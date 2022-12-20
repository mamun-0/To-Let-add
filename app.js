const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Proprietor = require('./models/proprietor');
mongoose.connect('mongodb://localhost:27017/toLet').then(() => {
  console.log('Database connected');
});

// set view engine for ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/show', async (req, res) => {
  const proprietors = await Proprietor.find({});
  res.render('mess/index', { proprietors });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});