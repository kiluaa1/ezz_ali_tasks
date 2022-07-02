const Item =require("../controllers/item.controller")
const router = require("express").Router()
const  {adminAuth,auth} = require("../middleware/auth.middleware")


router.post("/add",auth ,Item.addItem)
router.get("/all",auth,Item.getAllItems)
router.delete("/delete/id",auth,Item.deleteitem)

module.exports = router
