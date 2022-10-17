const express = require('express')
const {
  RegisterUser,
  Logout,
  Login,
  forgotPassword,
  ResetPassword,
} = require('../Controllers/Auth')

const authRoute = express.Router()

authRoute.route('/signup').post(RegisterUser)
authRoute.route('/login').post(Login)
authRoute.route('/logout').delete(Logout)
authRoute.route('/forgot/password').post(forgotPassword)
authRoute.route('/password/reset/:id').put(ResetPassword)

module.exports = authRoute
