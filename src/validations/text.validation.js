const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createText = {
  params: Joi.object().keys({
    snippetId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
};

const getText = {
  params: Joi.object().keys({
    snippetId: Joi.string().custom(objectId),
  }),
};

const updateText = {
  params: Joi.object().keys({
    snippetId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      body: Joi.string().required(),
    })
    .min(1),
};

const deleteText = {
  params: Joi.object().keys({
    snippetId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createText,
  getText,
  updateText,
  deleteText,
};
