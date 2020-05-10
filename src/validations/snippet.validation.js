const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createSnippet = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(null),
    start_year: Joi.number()
      .min(1990)
      .required(),
    end_year: Joi.number()
      .min(Joi.ref('start_year'))
      .required(),
    authors: Joi.array().allow(null),
    tags: Joi.array().allow(null),
  }),
};

const getSnippets = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSnippet = {
  params: Joi.object().keys({
    snippetId: Joi.string().custom(objectId),
  }),
};

const updateSnippet = {
  params: Joi.object().keys({
    snippetId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().allow(null),
      description: Joi.string().allow(null),
      start_year: Joi.number()
        .min(1990)
        .allow(null),
      end_year: Joi.number()
        .min(Joi.ref('start_year'))
        .allow(null),
      authors: Joi.array().allow(null),
      tags: Joi.array().allow(null),
      text: Joi.any(),
    })
    .min(1),
};

const deleteSnippet = {
  params: Joi.object().keys({
    snippetId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSnippet,
  getSnippets,
  getSnippet,
  updateSnippet,
  deleteSnippet,
};
