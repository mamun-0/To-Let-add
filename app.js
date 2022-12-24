const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate =  require('ejs-mate')
const Proprietor = require('./models/proprietor');
mongoose.connect('mongodb://localhost:27017/toLet').then(() => {
  console.log('Database connected');
});

//serving static files
app.use(express.static(path.join(__dirname, 'public')));
//middleware
app.use(express.urlencoded({extended:true}));
// set view engine for ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/mess', async (req, res) => {
  const proprietors = await Proprietor.find({});
  res.render('index', { proprietors });
});
app.get('/mess/new', (req,res)=>{
  res.render('newMess');
});
app.post('/mess', async (req,res)=>{
  const {mess} = req.body;
  const proprietor = new Proprietor(mess);
  await proprietor.save();
  res.redirect('/mess');
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
