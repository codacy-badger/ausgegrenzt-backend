const httpStatus = require('http-status');
const { pick } = require('lodash');
const AppError = require('../utils/AppError');
const { Tag } = require('../models');
const { getQueryOptions } = require('../utils/service.util');
const { defaultLanguage } = require('../utils/i18n.util');

const createTag = async (tagBody, language) => {
  Tag.setDefaultLanguage(language);
  const tag = await Tag.create(tagBody);
  return tag;
};

const getTags = async (query, language) => {
  const filter = pick(query, ['name', 'type']);
  if (filter.name) {
    filter.name = {
      $regex: filter.name,
      $options: 'i',
    };
  }
  const options = getQueryOptions(query);
  const tags = await Tag.aggregate([
    {
      $addFields: {
        name: {
          $ifNull: [`$name.${language}`, `$name.${defaultLanguage}`],
        },
      },
    },
    {
      $match: filter,
    },
    {
      $limit: options.limit,
    },
    {
      $skip: options.skip,
    },
  ]);
  const total = await Tag.count();
  return {
    docs: tags,
    totalDocs: total,
    page: query.page,
    limit: query.limit,
  };
};

const getTagById = async (tagId, language) => {
  Tag.setDefaultLanguage(language);
  const tag = await Tag.findById(tagId).populate('parent');
  if (!tag) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tag not found');
  }
  // const f = await tag.populate('parent');
  // console.log(f);
  return tag;
};

const getTagByEmail = async email => {
  const tag = await Tag.findOne({ email });
  if (!tag) {
    throw new AppError(httpStatus.NOT_FOUND, 'No tag found with this email');
  }
  return tag;
};

const updateTag = async (tagId, updateBody, language) => {
  const tag = await getTagById(tagId, language);
  Object.assign(tag, updateBody);
  await tag.save();
  // return tag.populate('parent');
};

const deleteTag = async tagId => {
  const tag = await getTagById(tagId);
  await tag.remove();
  return tag;
};

module.exports = {
  createTag,
  getTags,
  getTagById,
  getTagByEmail,
  updateTag,
  deleteTag,
};
