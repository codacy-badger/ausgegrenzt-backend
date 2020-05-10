const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');
const { languages, defaultLanguage } = require('../utils/i18n.util');

const textSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      intl: true,
    },
    body: {
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

textSchema.plugin(mongooseIntl, { languages, defaultLanguage });

module.exports = textSchema;
