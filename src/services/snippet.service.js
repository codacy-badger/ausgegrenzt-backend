const httpStatus = require('http-status');
const { pick } = require('lodash');
const AppError = require('../utils/AppError');
const { Snippet, Tag, Text } = require('../models');
const { getQueryOptions } = require('../utils/service.util');
const { defaultLanguage } = require('../utils/i18n.util');

const createSnippet = async (snippetBody, language) => {
  Snippet.setDefaultLanguage(language);
  const snippet = await Snippet.create(snippetBody);
  return snippet;
};

const getSnippets = async (query, language) => {
  const filter = pick(query, ['name', 'type']);
  if (filter.name) {
    filter.name = {
      $regex: filter.name,
      $options: 'i',
    };
  }
  const options = getQueryOptions(query);
  const snippets = await Snippet.aggregate([
    {
      $addFields: {
        name: {
          $ifNull: [`$name.${language}`, `$name.${defaultLanguage}`],
        },
        description: {
          $ifNull: [`$description.${language}`, `$description.${defaultLanguage}`],
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
  const total = await Snippet.count();
  return {
    docs: snippets,
    totalDocs: total,
    page: query.page,
    limit: query.limit,
  };
};

const getSnippetById = async (snippetId, language) => {
  Snippet.setDefaultLanguage(language);
  Tag.setDefaultLanguage(language);
  const snippet = await Snippet.findById(snippetId)
    .populate('authors')
    .populate('tags');
  if (!snippet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Snippet not found');
  }
  // const f = await snippet.populate('parent');
  // console.log(f);
  return snippet;
};

const updateSnippet = async (snippetId, updateBody, language) => {
  Snippet.setDefaultLanguage(language);
  Text.setDefaultLanguage(language);
  const snippet = await getSnippetById(snippetId, language);
  Object.assign(snippet, updateBody);
  await snippet.save();
  // return snippet.populate('parent');
};

const deleteSnippet = async snippetId => {
  const snippet = await getSnippetById(snippetId);
  await snippet.remove();
  return snippet;
};

module.exports = {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
};
