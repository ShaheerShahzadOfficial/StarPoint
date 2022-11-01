const express = require('express')
const { loadUser, deleteMyProfile, updateProfile, updatePassword, myProfile, getUserProfile, getAllUsers, getMyPosts, getUserPosts, followAndUnfollowUser,  } = require('../Controllers/user')
const {checkToken} = require('../middleware/auth');
// deleteMyAccount
const UserRoute = express.Router()

UserRoute.route("/me").get(checkToken,loadUser)
UserRoute.route("/myProfile").get(checkToken,myProfile)
UserRoute.route("/deleteMyAccount").delete(checkToken,deleteMyProfile)
UserRoute.route("/updateProfile").put(checkToken,updateProfile)
UserRoute.route("/updatePassword").put(checkToken,updatePassword)
UserRoute.route("/followAndUnfollowUser/:id").get(checkToken,followAndUnfollowUser)
UserRoute.route("/getUserProfile/:id").get(getUserProfile)
UserRoute.route("/getAllUsers").get(getAllUsers)
UserRoute.route("/getMyPosts").get(checkToken,getMyPosts)
UserRoute.route("/getUsersPost/:id").get(getUserPosts)


module.exports = UserRoute