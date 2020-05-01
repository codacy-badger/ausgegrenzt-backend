const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authorService } = require('../services');

const createAuthor = catchAsync(async (req, res) => {
  const author = await authorService.createAuthor(req.body);
  res.status(httpStatus.CREATED).send(author);
});

const getAuthors = catchAsync(async (req, res) => {
  const authors = await authorService.getAuthors(req.query);
  const response = authors;
  res.send(response);
});

const getAuthor = catchAsync(async (req, res) => {
  const author = await authorService.getAuthorById(req.params.authorId);
  res.send(author);
});

const updateAuthor = catchAsync(async (req, res) => {
  const author = await authorService.updateAuthor(req.params.authorId, req.body);
  res.send(author);
});

const deleteAuthor = catchAsync(async (req, res) => {
  await authorService.deleteAuthor(req.params.authorId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};
