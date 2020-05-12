const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');
const { languages, defaultLanguage } = require('../utils/i18n.util');

const mediaSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['image', 'youtube', 'iframe'],
      required: true,
    },
    caption: {
      type: String,
      required: false,
      trim: true,
      intl: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      intl: true,
    },
  },
  {
    id: false,
    timestamps: false,
    toJSON: {
      virtuals: true,
    },
  }
);

mediaSchema.plugin(mongooseIntl, { languages, defaultLanguage });

module.exports = mediaSchema;
