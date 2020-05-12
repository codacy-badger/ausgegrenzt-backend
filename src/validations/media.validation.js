const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createMedia = {
  params: Joi.object().keys({
    snippetId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    type: Joi.string()
      .required()
      .valid('image', 'youtube', 'iframe'),
    caption: Joi.string().allow(null),
    url: Joi.string().when('.type', { not: '', then: Joi.required() }),
  }),
  file: Joi.when(Joi.ref('..body.type'), { is: 'image', then: Joi.required() }),
};

const getMedia = {
  params: Joi.object().keys({
    snippetId: Joi.string().custom(objectId),
  }),
};

const updateMedia = {
  params: Joi.object().keys({
    snippetId: Joi.required().custom(objectId),
    mediaId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      caption: Joi.string().allow(null),
    })
    .min(1),
};

const deleteMedia = {
  params: Joi.object().keys({
    snippetId: Joi.string().custom(objectId),
    mediaId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createMedia,
  getMedia,
  updateMedia,
  deleteMedia,
};
