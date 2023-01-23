const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate =  require('ejs-mate')
const methodOverride = require('method-override');
const messRouter = require('./router/mess');
const AppError = require('./utils/AppError');
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


app.use('/mess', messRouter);

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
