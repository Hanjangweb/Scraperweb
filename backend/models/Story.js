const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Story title is required'],
    },
    url: {
      type: String,
      required: [true, 'Story URL is required'],
    },
    points: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: [true, 'Story author is required'],
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    hackerNewsId: {
      type: String,
      unique: true,
      sparse: true,
    },
    bookmarkedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Story', storySchema);
