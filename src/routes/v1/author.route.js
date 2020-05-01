const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const authorValidation = require('../../validations/author.validation');
const authorController = require('../../controllers/author.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageRecords'), validate(authorValidation.createAuthor), authorController.createAuthor)
  .get(auth('getRecords'), validate(authorValidation.getAuthors), authorController.getAuthors);

router
  .route('/:authorId')
  .get(auth('getRecords'), validate(authorValidation.getAuthor), authorController.getAuthor)
  .patch(auth('manageRecords'), validate(authorValidation.updateAuthor), authorController.updateAuthor)
  .delete(auth('manageRecords'), validate(authorValidation.deleteAuthor), authorController.deleteAuthor);

module.exports = router;
