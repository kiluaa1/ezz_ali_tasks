const post = require("../controllers/post.controller")
const router = require("express").Router()
router.post("/add", post.add)
router.post("/:id", post.updatepassword)
router.delete("/delete/:id", post.deletePost)


router.get("/all", post.showAll)
//get single user
router.get("/all/:id", post.getSinglePost)

module.exports=router