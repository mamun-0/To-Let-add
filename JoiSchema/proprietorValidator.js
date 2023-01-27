const Joi = require('joi');

module.exports.validateProprietorSchema = Joi.object({
  mess: Joi.object({
    buildingName: Joi.string().required(),
    buildingType: Joi.string().valid('Mess','Flat').required(),
    seatAvailability: Joi.number().min(0).required(),
    onlyFor : Joi.string().valid('Male','Female').required(),
    contact : Joi.string().required(),
    description : Joi.string().required()
  }).required(),
});