if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const messRouter = require('./router/mess');
const userRouter = require('./router/user');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo');
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/toLet';
mongoose.set('strictQuery', false);
mongoose.connect(dbURL).then(() => {
  console.log('Database connected');
});

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(mongoSanitize());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: dbURL,
      ttl: 24 * 60 * 60,
    }),
    name: 'session',
    secret: process.env.COOKIE_SECRET,
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
