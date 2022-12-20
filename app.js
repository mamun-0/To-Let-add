const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/toLet').then(() => {
  console.log('Database connected');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
