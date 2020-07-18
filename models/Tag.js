const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },

  count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('tag', TagSchema);
