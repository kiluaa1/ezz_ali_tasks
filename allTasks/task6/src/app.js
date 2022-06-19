require('../database/connect')
const express= require("express")
const app = express()
app.use(express.json())
const postRoutes=require("../routes/post.routes")
app.use(postRoutes)
module.exports = app