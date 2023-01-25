const {validateProprietorSchema} = require('../JoiSchema/proprietorValidator');
const AppError = require('../utils/AppError');
const {phone} = require('phone');

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
    req.flash('error', 'You must login first.');
    return res.redirect('/user/login');
  }else{
    next();
  }
}
module.exports.validPhone = (req,res,next)=>{
  const {mess} = req.body;
  const isValidNum = phone(mess.contact, { cuntry: null });
  console.log(req.originalUrl);
  if (!isValidNum.isValid) {
    req.flash('error', 'Invalid phone number');
    return res.redirect(req.originalUrl);
  }
  next();
}