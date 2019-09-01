const Joi = require('joi');

const genreSchema = {
  genre: Joi.string()
    .min(3)
    .required(),
};

const getGenreError = genre => {
  const { error } = Joi.validate({ genre }, genreSchema);
  if (!error) {
    return null;
  }
  return new Error(error.details[0].message);
};

module.exports.getGenreError = getGenreError;
