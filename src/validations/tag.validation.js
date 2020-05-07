const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createTag = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    parent_id: Joi.string()
      .custom(objectId)
      .allow(null),
    type: Joi.string(),
    longitude: Joi.number(),
    latitude: Joi.number(),
    parent: Joi.any().strip(),
  }),
};

const getTags = {
  query: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTag = {
  params: Joi.object().keys({
    tagId: Joi.string().custom(objectId),
  }),
};

const updateTag = {
  params: Joi.object().keys({
    tagId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      type: Joi.string(),
      longitude: Joi.number(),
      latitude: Joi.number(),
      parent: Joi.string()
        .custom(objectId)
        .allow(null),
    })
    .min(1),
};

const deleteTag = {
  params: Joi.object().keys({
    tagId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTag,
  getTags,
  getTag,
  updateTag,
  deleteTag,
};
