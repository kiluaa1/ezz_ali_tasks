const express= require("express")
const hbs= require("hbs")
const path= require("path")
const postRoutes = require("../routes/post.routes")
const app = express()
//for static file 
app.use(express.static(path.join(__dirname, "../resources/public")))
// special for hbs
app.set("view engine","hbs")
app.set("views",path.join(__dirname, "../resources/views"))
// for partials to enherit in hbs file
hbs.registerPartials(path.join(__dirname, "../resources/layouts"))
// for using post method
app.use(express.urlencoded({extended:true}))
// to uwe postRoutes
app.use(postRoutes)

module.exports=app
