const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync');
const Proprietor = require('../models/proprietor');
const { isLoggedin } = require('../middleware/middleware');
const { proprietorSchema, validPhone, isAuthor } = require('../middleware/middleware');
const multer = require('multer');
const {storage, cloudinary} = require('../cloudinary/cloudinary');
const upload = multer({storage});

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
  upload.single('image'),
  proprietorSchema,
  validPhone,
  wrapAsync(async (req, res) => {
    const { mess } = req.body;
    const {path, filename} = req.file;
    const proprietor = new Proprietor(mess);
    proprietor.image = {path, filename};
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
  isAuthor,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const proprietor = await Proprietor.findById(id);
    res.render('mess/edit', { proprietor });
  })
);
router.put(
  '/:id',
  isLoggedin,
  upload.single('image'),
  isAuthor,
  validPhone,
  wrapAsync(async (req, res) => {
    const { mess } = req.body;
    const {filename, path} = req.file;
    const { id } = req.params;
    const { image } = await Proprietor.findById(id);
    await cloudinary.uploader.destroy(image.filename);
    mess.image = {filename, path};
    await Proprietor.findByIdAndUpdate(id, mess);
    req.flash('success', 'successfully edited.');
    res.redirect(`/mess/${id}`);
  })
);
router.delete(
  '/:id',
  isLoggedin,
  isAuthor,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const {image} = await Proprietor.findById(id);
    await cloudinary.uploader.destroy(image.filename);
    await Proprietor.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted.');
    res.redirect('/mess');
  })
);


module.exports = router;