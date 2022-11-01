const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  caption: String,

  files: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
