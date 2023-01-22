const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate =  require('ejs-mate')
const Proprietor = require('./models/proprietor');
const methodOverride = require('method-override');
const wrapAsync = require('./utils/wrapAsync');
const AppError = require('./utils/AppError');
const {phone} = require('phone');
const { proprietorSchema } = require('./middleware/middleware');
mongoose.set('strictQuery', false);
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

app.get('/mess', wrapAsync(async (req, res) => {
  const proprietors = await Proprietor.find({});
  res.render('mess/index', { proprietors });
}));
app.get('/mess/new', (req,res)=>{
  res.render('mess/new');
});
app.post('/mess', proprietorSchema, wrapAsync(async (req,res)=>{
  const {mess} = req.body;
  const isValidNum = phone(mess.contact,{cuntry:null});
  if(!isValidNum.isValid){throw new AppError(400, "Invalid phone number");}
  const proprietor = new Proprietor(mess);
  await proprietor.save();
  res.redirect('/mess');
}));

app.get('/mess/:id', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const proprietor = await Proprietor.findById(id);
  res.render('mess/show', {proprietor});
}));
app.get('/mess/:id/edit',wrapAsync(async (req,res)=>{
  const {id} = req.params;
  const proprietor = await Proprietor.findById(id);
  res.render('mess/edit',{proprietor});
}));
app.put('/mess/:id', wrapAsync(async (req,res)=>{
  const {mess} = req.body;
  const {id} = req.params;
  await Proprietor.findByIdAndUpdate(id, {...mess});
  res.redirect(`/mess/${id}`);
}));
app.delete('/mess/:id', wrapAsync(async (req,res)=>{
  const {id} = req.params;
  await Proprietor.findByIdAndDelete(id);
  res.redirect('/mess');
}));
app.all('*',(req,res,next)=>{
  next(new AppError(404, "Page not found"));
});
app.use((err,req,res,next)=>{
  const {status = 500} = err;
  if(!err.message){err.message = "Somethig went wrong! Try again."}
  res.status(status).render('error/error',{err});
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
