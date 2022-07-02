require('../database/connect')
const express= require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
const path = require("path")
const staticDir = path.join(__dirname, "../images")
app.use(express.static(staticDir))
app.use(express.urlencoded({extended:true}))

app.use(cors())

const userRoutes=require("../routes/user.routes")
app.use("/user",userRoutes)

const catogryRoutes=require("../routes/catogry.routes")
app.use("/category",catogryRoutes)

const productRoutes=require("../routes/product.routes")
app.use("/product",productRoutes)

const itemRoutes=require("../routes/item.routes")
app.use("/item",itemRoutes)

const orderRoutes=require("../routes/order.routes")
app.use("/order",orderRoutes)

const contactRoutes=require("../routes/contact.routes")
app.use("/contact",contactRoutes)

app.options("*",cors())

module.exports = app