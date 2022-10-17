const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require('./Routes/Auth');
const UserRoute = require('./Routes/user');
const postRoute = require('./Routes/post');
const app = express()

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }))
app.use("/auth",authRoute)
app.use("/user",UserRoute)
app.use("/post",postRoute)

app.get("/",(req,res)=>{
    res.send("It is working")
})


app.use((req, res) => {
    res.status(404).json({
        Error: "URL Not Found"
    })
})

module.exports = app