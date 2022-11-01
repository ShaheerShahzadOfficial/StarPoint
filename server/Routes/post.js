const express = require('express');
const { createPost, deletePost, getPostOfFollowing, updateCaption, commentOnPost, likeAndUnlikePost, deleteComment } = require('../Controllers/post');
const { checkToken } = require('../middleware/auth');
const postRoute = express.Router()

postRoute.route("/upload").post(checkToken,createPost)
postRoute.route("/deletePost/:id").delete(checkToken,deletePost)
postRoute.route("/getPostOfFollowing").get(checkToken,getPostOfFollowing)
postRoute.route("/updateCaption/:id").put(checkToken,updateCaption)
postRoute.route("/likeAndUnlikePost/:id").get(checkToken,likeAndUnlikePost)
postRoute.route("/commentOnPost/:id").put(checkToken,commentOnPost)
postRoute.route("/DeleteCommentPost/:id").put(checkToken,deleteComment)

module.exports = postRoute