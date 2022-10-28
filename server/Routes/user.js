const express = require('express')
const { loadUser, deleteMyProfile, updateProfile, updatePassword, myProfile, getUserProfile, getAllUsers, getMyPosts, getUserPosts,  } = require('../Controllers/user')
const {checkToken} = require('../middleware/auth');
// deleteMyAccount
const UserRoute = express.Router()

UserRoute.route("/me").get(checkToken,loadUser)
UserRoute.route("/myProfile").get(checkToken,myProfile)
UserRoute.route("/deleteMyAccount").delete(checkToken,deleteMyProfile)
UserRoute.route("/updateProfile").put(checkToken,updateProfile)
UserRoute.route("/updatePassword").put(checkToken,updatePassword)
UserRoute.route("/followAndUnfollowUser/:id")
UserRoute.route("/getUserProfile/:id").get(checkToken,getUserProfile)
UserRoute.route("/getAllUsers").get(getAllUsers)
UserRoute.route("/getMyPosts").get(getMyPosts)
UserRoute.route("/getUsersPost/:id").get(getUserPosts)


module.exports = UserRoute