// const multer  = require('multer')
const User = require("../controllers/user.controller")
const router = require("express").Router()
const  {auth,adminAuth}= require("../middleware/auth.middleware")
router.post("/register",User.register)
//add user
//login user
router.post("/login", User.login)
router.get("/all",auth,User.getAllUsers)
router.post("/verify", auth , User.verify)
router.post("/forget", User.forgetPassword)
router.post("/reset", User.resetPassword)
router.get("/single",auth, User.getSingleUser)
router.post("/logout",auth, User.logout)

// router.post("/verify", adminAuth , User.verify)
router.post("/add_admin",adminAuth ,User.addAdmin)
router.get("/all",auth,User.getAllUsers)


module.exports = router
