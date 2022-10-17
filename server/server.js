const http = require('http')
const app = require('./app.js')
const cloudinary = require('cloudinary')
const DBConnection = require('./config/database.js')
const dotenv = require('dotenv');
const server = http.createServer(app)

dotenv.config({ path: "config/config.env" })

DBConnection()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(`App is running on http://localhost:${port}/`)
})
