const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  path: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('File', FileSchema);
