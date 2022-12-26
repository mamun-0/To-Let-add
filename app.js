const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate =  require('ejs-mate')
const Proprietor = require('./models/proprietor');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/toLet').then(() => {
  console.log('Database connected');
});

//middleware
app.use(express.urlencoded({extended:true}));
//serving static files
app.use(express.static(path.join(__dirname, 'public')));
// set view engine for ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/mess', async (req, res) => {
  const proprietors = await Proprietor.find({});
  res.render('mess/index', { proprietors });
});
app.get('/mess/new', (req,res)=>{
  res.render('mess/new');
});
app.post('/mess', async (req,res)=>{
  const {mess} = req.body;
  const proprietor = new Proprietor(mess);
  await proprietor.save();
  res.redirect('/mess');
});

app.get('/mess/:id', async (req, res) => {
  const { id } = req.params;
  const proprietor = await Proprietor.findById(id);
  res.render('mess/show', {proprietor});
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
