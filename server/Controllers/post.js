const Post = require('../models/postSchema')
const cloudinary = require('cloudinary')
const User = require('../models/userSchema')

const createPost = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.files, {
      folder: 'SocialApp',
    })
    const newPostData = {
      caption: req.body.caption,
      files: {
        public_id: myCloud?.public_id,
        url: myCloud?.secure_url,
      },
      owner: req?.user?.id,
      Filetype:req.body.Filetype
    }
    const post = await Post.create(newPostData)

    const user = await User.findById(req.user.id)

    user.posts.unshift(post._id)

    await user.save()
    res.status(201).json({
      success: true,
      message: 'Post created',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    if (post?.owner?.toString() !== req?.user?._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    await cloudinary.v2.uploader.destroy(post?.files?.public_id)

    await post?.remove()

    const user = await User.findById(req.user.id)

    const index = user.posts.indexOf(req.params.id)
    user.posts.splice(index, 1)

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Post deleted',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const posts = await Post.find({
      owner: {
        $in: user?.following,
      },
    }).populate('owner likes comments.user')

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    if (post.owner.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }
    post.caption = req.body.caption

    await post.save()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    if (post.likes.includes(req.user.id)) {
      const index = post.likes.indexOf(req.user.id)

      post.likes.splice(index, 1)

      await post.save()

      return res.status(200).json({
        success: true,
        message: 'Post Unliked',
      })
    } else {
      post.likes.push(req.user.id)

      await post.save()

      return res.status(200).json({
        success: true,
        message: 'Post Liked',
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


const commentOnPost  = async (req, res)=>{
try {
const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  post.comments.push({
    user: req.user.id,
    comment: req.body.comment,
  });

  await post.save();
  return res.status(200).json({
    success: true,
    message: "Comment added",
  });
    
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
}

const DeleteCommentPost  = async (req, res)=>{
  try {
    const post = await Post.findById(req.params.id);

    if (post.owner.toString() === req.user.id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(400).json({
          success: false,
          message: "Comment Id is required",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user.id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createPost,
  getPostOfFollowing,
  deletePost,
  updateCaption,
  likeAndUnlikePost,
  commentOnPost,
  DeleteCommentPost
}
