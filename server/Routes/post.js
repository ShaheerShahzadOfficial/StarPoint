const express = require('express');
const { createPost, deletePost, getPostOfFollowing, updateCaption, commentOnPost, likeAndUnlikePost, DeleteCommentPost } = require('../Controllers/post');
const { checkToken } = require('../middleware/auth');
const postRoute = express.Router()

postRoute.route("/upload").post(checkToken,createPost)
postRoute.route("/deletePost/:id").delete(checkToken,deletePost)
postRoute.route("/getPostOfFollowing").get(checkToken,getPostOfFollowing)
postRoute.route("/updateCaption/:id").post(checkToken,updateCaption)
postRoute.route("/likeAndUnlikePost/:id").post(checkToken,likeAndUnlikePost)
postRoute.route("/commentOnPost/:id").post(checkToken,commentOnPost)
postRoute.route("/DeleteCommentPost/:id").post(checkToken,DeleteCommentPost)

module.exports = postRoute