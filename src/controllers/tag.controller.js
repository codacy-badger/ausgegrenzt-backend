const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { tagService } = require('../services');

const createTag = catchAsync(async (req, res) => {
  const tag = await tagService.createTag(req.body, req.locale.language);
  res.status(httpStatus.CREATED).send(tag);
});

const getTags = catchAsync(async (req, res) => {
  const tags = await tagService.getTags(req.query, req.locale.language);
  const response = tags;
  res.send(response);
});

const getTag = catchAsync(async (req, res) => {
  const tag = await tagService.getTagById(req.params.tagId, req.locale.language);
  res.send(tag);
});

const updateTag = catchAsync(async (req, res) => {
  const tag = await tagService.updateTag(req.params.tagId, req.body, req.locale.language);
  res.send(tag);
});

const deleteTag = catchAsync(async (req, res) => {
  await tagService.deleteTag(req.params.tagId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTag,
  getTags,
  getTag,
  updateTag,
  deleteTag,
};
