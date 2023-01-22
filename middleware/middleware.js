const {validateProprietorSchema} = require('../JoiSchema/proprietorValidator');
const AppError = require('../utils/AppError');

module.exports.proprietorSchema = (req,res,next)=>{
    const { error } = validateProprietorSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      throw new AppError(400, msg);
    }else{
        next();
    }
}
