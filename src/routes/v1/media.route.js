const express = require('express');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const mediaValidation = require('../../validations/media.validation');
const mediaController = require('../../controllers/media.controller');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './statics/media');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (/jpeg|jpg|png/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// eslint-disable-next-line
const upload = new multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10mb
    fileFilter,
  },
});

const router = express.Router();

router
  .route('/:snippetId/media')
  .get(validate(mediaValidation.getMedia), mediaController.getMedia)
  .post(auth('manageRecords'), upload.single('image'), validate(mediaValidation.createMedia), mediaController.createMedia);
router
  .route('/:snippetId/media/:mediaId')
  .patch(auth('manageRecords'), validate(mediaValidation.updateMedia), mediaController.updateMedia)
  .delete(auth('manageRecords'), validate(mediaValidation.deleteMedia), mediaController.deleteMedia);

module.exports = router;
