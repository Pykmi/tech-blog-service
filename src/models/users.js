import mongoose from 'mongoose';

const model = new mongoose.Schema({
  name: { type: String, trim: true },
  email: {
    unique: true,
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('user', model);