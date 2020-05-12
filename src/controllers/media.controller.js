const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { mediaService } = require('../services');

const createMedia = catchAsync(async (req, res) => {
  const mediaBody = req.body.type === 'image' ? Object.assign(req.body, { url: req.file.path }) : req.body;
  const media = await mediaService.createMedia(mediaBody, req.params.snippetId, req.locale.language);
  res.status(httpStatus.CREATED).send(media);
});

const getMedia = catchAsync(async (req, res) => {
  const media = await mediaService.getMedia(req.params.snippetId, req.locale.language);
  res.send(media);
});

const updateMedia = catchAsync(async (req, res) => {
  const mediaBody = req.body.type === 'image' && req.file ? Object.assign(req.body, { url: req.file.path }) : req.body;
  const media = await mediaService.updateMedia(req.params.mediaId, req.params.snippetId, mediaBody, req.locale.language);
  res.send(media);
});

const deleteMedia = catchAsync(async (req, res) => {
  await mediaService.deleteMedia(req.params.mediaId, req.params.snippetId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMedia,
  getMedia,
  updateMedia,
  deleteMedia,
};
