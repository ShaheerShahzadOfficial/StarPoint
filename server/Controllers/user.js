const Post = require('../models/postSchema.js')
const User = require('../models/userSchema.js')
const { stringToHash, varifyHash } = require('bcrypt-inzi')
const cloudinary = require('cloudinary');

const loadUser = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(404).json({
      Error: 'User Not Found',
    })
  }
  res.status(200).json({
    success: true,
    user,
  })
}

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const { name, email, avatar } = req.body

    if (name) {
      user.name = name
    }
    if (email) {
      user.email = email
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user?.avatar?.public_id)

if (avatar !== user.avatar.url) {
  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: 'SocialAppAvatar',
  })
  user.avatar.public_id = myCloud?.public_id
  user.avatar.url = myCloud?.secure_url
}
await user.save()
} 

await user.save()



    res.status(200).json({
      success: true,
      message: 'Profile Updated',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const posts = user?.posts
    const followers = user.followers
    const following = user.following
    const userId = user?._id

    // Removing Avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user?.avatar?.public_id)

    await user.remove()

    // Logout user after deleting profile

    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })

    // Delete all posts of the user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i])
      await cloudinary.v2.uploader.destroy(post.files.public_id)
      await post.remove()
    }

    // Removing User from Followers Following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i])

      const index = follower.following.indexOf(userId)
      follower.following.splice(index, 1)
      await follower.save()
    }

    // Removing User from Following's Followers
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i])

      const index = follows.followers.indexOf(userId)
      follows.followers.splice(index, 1)
      await follows.save()
    }

    // removing all comments of the user from all posts
    const allPosts = await Post.find()

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id)

      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1)
        }
      }
      await post.save()
    }
    // removing all likes of the user from all posts

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id)

      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userId) {
          post.likes.splice(j, 1)
        }
      }
      await post.save()
    }

    res.status(200).json({
      success: true,
      message: 'Profile Deleted',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide old and new password',
      })
    }

    //   const isMatch = await user.matchPassword(oldPassword);
    const isMatch = varifyHash(oldPassword, user?.password)

    if (!isMatch) {
      console.log(isMatch)
      return res.status(400).json({
        success: false,
        message: 'Incorrect Old password',
      })
    }
    stringToHash(newPassword).then(async (string) => {
      await User.findByIdAndUpdate(req.user.id,{password:string})
    })
    await user?.save()

    res.status(200).json({
      success: true,
      message: 'Password Updated',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const followAndUnfollowUser = async (req, res) => {
  try {
    const UserToBeFollowed = await User.findById(req.params.id)
    const LoggedInUser = await User.findById(req.user.id)

    if (!UserToBeFollowed) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "posts followers following"
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  loadUser,
  deleteMyProfile,
  updateProfile,
  updatePassword,
  followAndUnfollowUser,
  myProfile,
  getUserProfile,
  getAllUsers,getUserPosts,
  getMyPosts
}
