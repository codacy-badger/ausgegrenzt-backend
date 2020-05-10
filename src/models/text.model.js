const mongoose = require('mongoose');
const textSchema = require('./text.schema');

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
