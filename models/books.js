var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create schema for the books collection
var model = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('book', model);