const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');
const AppError = require('../utils/AppError');
const { Snippet, Media } = require('../models');

const createMedia = async (mediaBody, snippetId, language) => {
  Media.setDefaultLanguage(language);
  Snippet.setDefaultLanguage(language);
  const snippet = await Snippet.findById(snippetId);
  if (!snippet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Snippet not found');
  }
  const media = new Media();
  Object.assign(media, mediaBody);
  snippet.media.push(media);
  snippet.save();
  return media;
};

const getMedia = async (snippetId, language) => {
  Media.setDefaultLanguage(language);
  Snippet.setDefaultLanguage(language);
  const snippet = await Snippet.findById(snippetId);
  if (!snippet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Snippet not found');
  }
  await snippet.save();
  return {
    docs: snippet.media,
    totalDocs: snippet.media.length,
    page: 1,
    limit: 0,
  };
};

const updateMedia = async (mediaId, snippetId, updateBody, language) => {
  Media.setDefaultLanguage(language);
  Snippet.setDefaultLanguage(language);
  const snippet = await Snippet.findById(snippetId);
  if (!snippet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Snippet not found');
  }
  const media = await snippet.media.id(mediaId);
  if (!media) {
    throw new AppError(httpStatus.NOT_FOUND, 'Media not found');
  }
  Object.assign(media, updateBody);
  await snippet.save();
  return media;
};

const deleteMedia = async (mediaId, snippetId) => {
  const snippet = await Snippet.findById(snippetId);
  if (!snippet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Snippet not found');
  }
  const media = snippet.media.id(mediaId);
  await media.remove();
  await snippet.save();
  if (media.url) {
    // safely delete
    const imagePath = path.resolve(`./${media.url}`);
    const staticPath = path.resolve('./statics/media');
    // eslint-disable-next-line
    if (imagePath.startsWith(staticPath) && fs.existsSync(imagePath)) {
      // eslint-disable-next-line
      fs.unlink(imagePath, err => {
        if (err) {
          throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `failed to delete local image${err}`);
        }
      });
    }
  }
  return true;
};

module.exports = {
  createMedia,
  getMedia,
  updateMedia,
  deleteMedia,
};
