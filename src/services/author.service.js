const httpStatus = require('http-status');
const { pick } = require('lodash');
const AppError = require('../utils/AppError');
const { Author } = require('../models');
const { getQueryOptions } = require('../utils/service.util');

const createAuthor = async authorBody => {
  const author = await Author.create(authorBody);
  return author;
};

const getAuthors = async query => {
  const filter = pick(query, ['name']);
  const options = getQueryOptions(query);
  const authors = await Author.find(filter, null, options);
  const total = await Author.count();
  return {
    docs: authors,
    totalDocs: total,
    page: query.page,
    limit: query.limit,
  };
};

const getAuthorById = async authorId => {
  const author = await Author.findById(authorId);
  if (!author) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }
  return author;
};

const getAuthorByEmail = async email => {
  const author = await Author.findOne({ email });
  if (!author) {
    throw new AppError(httpStatus.NOT_FOUND, 'No author found with this email');
  }
  return author;
};

const updateAuthor = async (authorId, updateBody) => {
  const author = await getAuthorById(authorId);
  Object.assign(author, updateBody);
  await author.save();
  return author;
};

const deleteAuthor = async authorId => {
  const author = await getAuthorById(authorId);
  await author.remove();
  return author;
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthorById,
  getAuthorByEmail,
  updateAuthor,
  deleteAuthor,
};
