if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const messRouter = require('./router/mess');
const userRouter = require('./router/user');
const AppError = require('./utils/AppError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/toLet').then(() => {
  console.log('Database connected');
});

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(mongoSanitize());
app.use(
  session({
    secret: 'thisisoursillySecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

//PassportJs middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

//serving static files
app.use(express.static(path.join(__dirname, 'public')));
// set view engine for ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res)=>{
  res.render('home/index');
})
//Router
app.use('/mess', messRouter);
app.use('/user', userRouter);

app.all('*', (req, res, next) => {
  res.render('404/404')
});
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) {
    err.message = 'Somethig went wrong! Try again.';
  }
  res.status(status).render('error/error', { err });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
