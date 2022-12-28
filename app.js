const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate =  require('ejs-mate')
const Proprietor = require('./models/proprietor');
const methodOverride = require('method-override');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/toLet').then(() => {
  console.log('Database connected');
});

//middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
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
app.get('/mess/:id/edit',async (req,res)=>{
  const {id} = req.params;
  const proprietor = await Proprietor.findById(id);
  res.render('mess/edit',{proprietor});
})
app.put('/mess/:id', async (req,res)=>{
  const {mess} = req.body;
  const {id} = req.params;
  await Proprietor.findByIdAndUpdate(id, {...mess});
  res.redirect(`/mess/${id}`);
})
app.delete('/mess/:id', async (req,res)=>{
  const {id} = req.params;
  await Proprietor.findByIdAndDelete(id);
  res.redirect('/mess');
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
