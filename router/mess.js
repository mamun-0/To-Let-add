const express = require('express');
const router = express.Router();
const { phone } = require('phone');
const wrapAsync = require('../utils/wrapAsync');
const Proprietor = require('../models/proprietor');
const AppError = require('../utils/AppError');
const { proprietorSchema } = require('../middleware/middleware');

router.get('/', wrapAsync(async (req, res) => {
    const proprietors = await Proprietor.find({});
    res.render('mess/index', { proprietors });
  })
);

router.get('/new', (req, res) => {
  res.render('mess/new');
});

router.post(
  '/',
  proprietorSchema,
  wrapAsync(async (req, res) => {
    const { mess } = req.body;
    const isValidNum = phone(mess.contact, { cuntry: null });
    if (!isValidNum.isValid) {
      throw new AppError(400, 'Invalid phone number');
    }
    const proprietor = new Proprietor(mess);
    await proprietor.save();
    req.flash('success', 'New mess created successfully.');
    res.redirect('/mess');
  })
);

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const proprietor = await Proprietor.findById(id);
    res.render('mess/show', { proprietor });
  })
);
router.get(
  '/:id/edit',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const proprietor = await Proprietor.findById(id);
    res.render('mess/edit', { proprietor });
  })
);
router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    const { mess } = req.body;
    const { id } = req.params;
    await Proprietor.findByIdAndUpdate(id, { ...mess });
    req.flash('success','successfully edited.');
    res.redirect(`/mess/${id}`);
  })
);
router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Proprietor.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted.');
    res.redirect('/mess');
  })
);


module.exports = router;