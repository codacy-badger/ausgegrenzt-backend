const httpStatus = require('http-status');
const AppError = require('../utils/AppError');
const { Snippet, Text } = require('../models');

const createText = async (textBody, snippetId, language) => {
  Text.setDefaultLanguage(language);
  Snippet.setDefaultLanguage(language);
  const snippet = await Snippet.findById(snippetId);
  if (!snippet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Snippet not found');
  }
  const text = await new Text();
  Object.assign(text, textBody);
  snippet.text = text;
  return snippet.text;
};

const getText = async (snippetId, language) => {
  Text.setDefaultLanguage(language);
  Snippet.setDefaultLanguage(language);
  const snippet = await Snippet.findById(snippetId);
  if (!snippet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Snippet not found');
  }
  await snippet.save();
  return snippet.text;
};

const updateText = async (snippetId, updateBody, language) => {
  Text.setDefaultLanguage(language);
  Snippet.setDefaultLanguage(language);
  const snippet = await Snippet.findById(snippetId);
  if (!snippet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Snippet not found');
  }
  Object.assign(snippet.text, updateBody);
  await snippet.save();
  return snippet.text;
};

const deleteText = async snippetId => {
  const snippet = await Snippet.findById(snippetId);
  if (!snippet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Snippet not found');
  }
  await snippet.text.remove();
  await snippet.save();
  return snippet.text;
};

module.exports = {
  createText,
  getText,
  updateText,
  deleteText,
};
