const mongoose = require('mongoose');
const mediaSchema = require('./media.schema');

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
