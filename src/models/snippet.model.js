const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');
const { languages, defaultLanguage } = require('../utils/i18n.util');
const textSchema = require('./text.schema');
const mediaSchema = require('./media.schema');

const snippetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      intl: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      intl: true,
    },
    start_year: {
      type: Number,
      required: true,
    },
    end_year: {
      type: Number,
      required: true,
    },
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    text: {
      type: textSchema,
    },
    media: [
      {
        type: mediaSchema,
      },
    ],
  },
  {
    id: false,
    timestamps: false,
    toJSON: {
      virtuals: true,
    },
  }
);

snippetSchema.plugin(mongooseIntl, { languages, defaultLanguage });

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
