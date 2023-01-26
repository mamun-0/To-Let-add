const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync');
const Proprietor = require('../models/proprietor');
const { isLoggedin } = require('../middleware/middleware');
const { proprietorSchema, validPhone } = require('../middleware/middleware');

router.get('/', wrapAsync(async (req, res) => {
    const proprietors = await Proprietor.find({});
    res.render('mess/index', { proprietors });
  })
);

router.get('/new', isLoggedin, (req, res) => {
  res.render('mess/new');
});

router.post(
  '/',
  isLoggedin,
  proprietorSchema,
  validPhone,
  wrapAsync(async (req, res) => {
    const { mess } = req.body;
    const proprietor = new Proprietor(mess);
    proprietor.author = req.user._id;
    await proprietor.save();
    req.flash('success', 'New mess created successfully.');
    res.redirect('/mess');
  })
);

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const proprietor = await Proprietor.findById(id).populate('author');
    res.render('mess/show', { proprietor });
  })
);
router.get(
  '/:id/edit',
  isLoggedin,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const proprietor = await Proprietor.findById(id);
    res.render('mess/edit', { proprietor });
  })
);
router.put(
  '/:id',
  isLoggedin,
  proprietorSchema,
  validPhone,
  wrapAsync(async (req, res) => {
    const { mess } = req.body;
    const { id } = req.params;
    await Proprietor.findByIdAndUpdate(id, { ...mess });
    req.flash('success', 'successfully edited.');
    res.redirect(`/mess/${id}`);
  })
);
router.delete(
  '/:id',
  isLoggedin,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Proprietor.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted.');
    res.redirect('/mess');
  })
);


module.exports = router;