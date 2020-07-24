const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  header: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  postImage: {
    type: String,
  },
  genre: {
    type: String,
  },
  averageRating: {
    type: Number,
    required: true,
    default: 0,
  },
  chapters: [
    {
      header: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      countChapters: {
        type: Number,
      },
      postImage: {
        type: String,
      },
      date: {
        type: Date,
        required: true,
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
    },
  ],
  tags: [
    {
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
    },
  ],
  rating: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  countChapters: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
