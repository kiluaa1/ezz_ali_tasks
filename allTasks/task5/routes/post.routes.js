const router = require("express").Router()
const postController = require("../controllers/post.controller")

router.get("/", postController.home)
router.get("/addUser", postController.addUser)
router.post("/addUser", postController.addUserLogic)
router.get("/single/:id",postController.single)
router.get("/edit/:id",postController.edit)
router.post("/edit/:id",postController.editLogic)

router.get("/delete/:id", postController.delItem)
router.get("/status/:id/:status", postController.status)


module.exports = router
