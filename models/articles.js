var 
    models = require('../models'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create schema for the articles collection
const model = new Schema({
  url: {
    unique: true,
    type: String
  },
  title: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  public: {
    type: Boolean,
    default: false
  },
  smalltext: {
    type: String,
    required: true,
    trim: true
  },
  bodytext: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  likes: { type : Number },
  tags: { type: [String] }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

model.pre('save', function(next) {
  const categories = models.lists.findOneAndUpdate(
    { name: 'categories' },
    { $addToSet: { items: this.category.toLowerCase() } },
    { upsert: true }
  );

  const tags = models.lists.findOneAndUpdate(
    { name: 'tags' },
    { $addToSet: { items: { $each: this.tags.map((i) => i.toLowerCase()) } } },
    { upsert: true });
  
  categories.exec();
  tags.exec();

  this.url = this.title.trim().split(' ').join('-').toLowerCase();
  next();
});

module.exports = mongoose.model('article', model);