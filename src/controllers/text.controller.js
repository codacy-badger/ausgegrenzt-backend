const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { textService } = require('../services');

const createText = catchAsync(async (req, res) => {
  const text = await textService.createText(req.body, req.params.snippetId, req.locale.language);
  res.status(httpStatus.CREATED).send(text);
});

const getText = catchAsync(async (req, res) => {
  const text = await textService.getText(req.params.snippetId, req.locale.language);
  res.send(text);
});

const updateText = catchAsync(async (req, res) => {
  const text = await textService.updateText(req.params.snippetId, req.body, req.locale.language);
  res.send(text);
});

const deleteText = catchAsync(async (req, res) => {
  await textService.deleteText(req.params.snippetId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createText,
  getText,
  updateText,
  deleteText,
};
