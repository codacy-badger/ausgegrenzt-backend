const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const textValidation = require('../../validations/text.validation');
const textController = require('../../controllers/text.controller');

const router = express.Router();

router
  .route('/:snippetId/text')
  .get(validate(textValidation.getText), textController.getText)
  .post(auth('manageRecords'), validate(textValidation.createText), textController.createText)
  .patch(auth('manageRecords'), validate(textValidation.updateText), textController.updateText)
  .delete(auth('manageRecords'), validate(textValidation.deleteText), textController.deleteText);

module.exports = router;
