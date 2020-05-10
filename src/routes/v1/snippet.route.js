const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const snippetValidation = require('../../validations/snippet.validation');
const snippetController = require('../../controllers/snippet.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageRecords'), validate(snippetValidation.createSnippet), snippetController.createSnippet)
  .get(validate(snippetValidation.getSnippets), snippetController.getSnippets);
// .get(auth('getRecords'), validate(snippetValidation.getSnippets), snippetController.getSnippets);

router
  .route('/:snippetId')
  .get(validate(snippetValidation.getSnippet), snippetController.getSnippet)
  // .get(auth('getRecords'), validate(snippetValidation.getSnippet), snippetController.getSnippet)
  .patch(auth('manageRecords'), validate(snippetValidation.updateSnippet), snippetController.updateSnippet)
  .delete(auth('manageRecords'), validate(snippetValidation.deleteSnippet), snippetController.deleteSnippet);

module.exports = router;
