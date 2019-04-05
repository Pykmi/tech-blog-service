import mongoose from 'mongoose';

const model = new mongoose.Schema({
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