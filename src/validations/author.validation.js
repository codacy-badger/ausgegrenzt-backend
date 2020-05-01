const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createAuthor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getAuthors = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAuthor = {
  params: Joi.object().keys({
    authorId: Joi.string().custom(objectId),
  }),
};

const updateAuthor = {
  params: Joi.object().keys({
    authorId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteAuthor = {
  params: Joi.object().keys({
    authorId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};
