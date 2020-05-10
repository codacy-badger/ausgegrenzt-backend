const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const tagValidation = require('../../validations/tag.validation');
const tagController = require('../../controllers/tag.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageRecords'), validate(tagValidation.createTag), tagController.createTag)
  .get(validate(tagValidation.getTags), tagController.getTags);
// .get(auth('getRecords'), validate(tagValidation.getTags), tagController.getTags);

router
  .route('/:tagId')
  .get(validate(tagValidation.getTag), tagController.getTag)
  // .get(auth('getRecords'), validate(tagValidation.getTag), tagController.getTag)
  .patch(auth('manageRecords'), validate(tagValidation.updateTag), tagController.updateTag)
  .delete(auth('manageRecords'), validate(tagValidation.deleteTag), tagController.deleteTag);

module.exports = router;
