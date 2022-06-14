const router = require("express").Router()
const postController = require("../controllers/post.controller")

router.get("/", postController.home)

router.get("/add", postController.add)

router.get("/single/:id",postController.single)

router.get("/editPost/:id",postController.edit)
router.post("/editPost/:id",postController.editLogic)

router.get("/delete/:id",postController.delete)


router.get("/add", postController.add)

router.get("/addPost",postController.addPost)
router.post("/addPost", postController.addPostLogic)


module.exports = router
