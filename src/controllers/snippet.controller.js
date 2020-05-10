const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { snippetService } = require('../services');

const createSnippet = catchAsync(async (req, res) => {
  const snippet = await snippetService.createSnippet(req.body, req.locale.language);
  res.status(httpStatus.CREATED).send(snippet);
});

const getSnippets = catchAsync(async (req, res) => {
  const snippets = await snippetService.getSnippets(req.query, req.locale.language);
  const response = snippets;
  res.send(response);
});

const getSnippet = catchAsync(async (req, res) => {
  const snippet = await snippetService.getSnippetById(req.params.snippetId, req.locale.language);
  res.send(snippet);
});

const updateSnippet = catchAsync(async (req, res) => {
  const snippet = await snippetService.updateSnippet(req.params.snippetId, req.body, req.locale.language);
  res.send(snippet);
});

const deleteSnippet = catchAsync(async (req, res) => {
  await snippetService.deleteSnippet(req.params.snippetId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSnippet,
  getSnippets,
  getSnippet,
  updateSnippet,
  deleteSnippet,
};
