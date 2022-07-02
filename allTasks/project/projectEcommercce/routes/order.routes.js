const Order =require("../controllers/order.controller")
const router = require("express").Router()
const  {auth, adminAuth} = require("../middleware/auth.middleware")


router.post("/add",auth ,Order.addOrder)
router.get("/all",adminAuth,Order.getAllOrders)
router.put("/status/id",adminAuth,Order.updateStatus)
router.delete("/delete/id",adminAuth,Order.deleteorder)



module.exports = router
