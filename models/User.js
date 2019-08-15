const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  isAdmin: { type: Boolean, default: false },
  name: String,
  username: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  instagram: String,
  website: String,
  avatar: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
