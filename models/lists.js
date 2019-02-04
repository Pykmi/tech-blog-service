var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const model = new Schema({
  name: {
    unique: true,
    type: String,
    required: true,
    trim: true
  },
  items: {
    type: [String]
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('list', model);