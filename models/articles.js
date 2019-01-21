var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create schema for the articles collection
var model = new Schema({
  title: { type: String },
  author: { type: String },
  category: { type: String },
  public: { type: Boolean, default: false },
  created_at: { type: Date },
  modified_at: { type: Date },
  smalltext: { type: String },
  bodytext: { type: String },
  image: { type: String },
  likes: { type : Number },
  url: { type: String },
  tags: { type: Array }
});

module.exports = mongoose.model('article', model);