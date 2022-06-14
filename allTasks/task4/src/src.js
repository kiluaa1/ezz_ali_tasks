const express = require("express")
const hbs= require("hbs")
const path =require("path")
const app=express()

app.set("view engine","hbs")

app.use(express.urlencoded({extended:true}))


app.use( express.static(path.join(__dirname,"../resources/puplic")))
app.set("views",path.join(__dirname,"../resources/views"))
hbs.registerPartials(path.join(__dirname,"../resources/layouts"))
const postRoutes = require("../routers/post.router")

app.use(postRoutes)



module.exports=app