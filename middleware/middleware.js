const {validateProprietorSchema} = require('../JoiSchema/proprietorValidator');
const AppError = require('../utils/AppError');
const {phone} = require('phone');
const Proprietor = require('../models/proprietor');
module.exports.proprietorSchema = (req,res,next)=>{
    const { error } = validateProprietorSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      throw new AppError(400, msg);
    }else{
        next();
    }
}
module.exports.isLoggedin = (req,res,next)=>{
  if(!req.isAuthenticated()){
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must login first.');
    return res.redirect('/user/login');
  }else{
    next();
  }
}
module.exports.validPhone = (req,res,next)=>{
  const {mess} = req.body;
  const isValidNum = phone(mess.contact, { cuntry: null });
  if (!isValidNum.isValid) {
    req.flash('error', 'Invalid phone number');
    return res.redirect(req.originalUrl);
  }
  next();
}

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const proprietor = await Proprietor.findById(id).populate('author');
  if (!(req.user.username === proprietor.author.username)) {
    req.flash('error', `You don't have permission to do that.`);
    return res.redirect(`/mess/${id}`);
  }
  next();
};