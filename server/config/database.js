const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const DBConnection = () => {
  const url = "mongodb+srv://ShaheerShahzad:ShaheerDev@ecommerce.w8dyp.mongodb.net/StarPoint?retryWrites=true&w=majority"

  mongoose.connect(url, { useNewUrlParser: true }).then((result) => {
    console.log(`DATABASE CONNECTED WITH THE HOST ${result.connection.host}`)
  })


}

module.exports = DBConnection
