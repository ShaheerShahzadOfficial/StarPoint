const jsonwebtoken = require('jsonwebtoken')

function checkToken(req, res, next) {
  //get authcookie from request
  const { authToken } = req.cookies

  if (!authToken) {
    return res.status(401).json({
      Error: 'Please Login to access this resource',
    })
  }

  console.log(authToken)
  //verify token which is in cookie value
  jsonwebtoken.verify(authToken, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      res.status(403).json({
        Message: 'You Are Not Authenticated',
      })
      console.log(err)
    } else if (decoded) {
      req.user = decoded
      console.log(decoded)
      next()
    }
  })
}

module.exports = {
  checkToken,
}
