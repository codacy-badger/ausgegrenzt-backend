const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');
const { languages, defaultLanguage } = require('../utils/i18n.util');

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      intl: true,
    },
    type: {
      type: String,
      enum: ['topic', 'person', 'place'],
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: false,
    },
    longitude: {
      type: Number,
      required() {
        return this.type === 'Place';
      },
    },
    latitude: {
      type: Number,
      required() {
        return this.type === 'Place';
      },
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

tagSchema.plugin(mongooseIntl, { languages, defaultLanguage });

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
