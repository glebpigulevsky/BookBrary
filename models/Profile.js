const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  location: {
    type: String,
    default: 'Anywhere in this world',
  },
  bio: {
    type: String,
    default: 'I am the best writer',
  },
  social: {
    youtube: {
      type: String,
      default: 'https://youtube.com',
    },
    facebook: {
      type: String,
      default: 'https://facebook.com',
    },
    instagram: {
      type: String,
      default: 'https://instagram.com',
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('profile', ProfileSchema);
