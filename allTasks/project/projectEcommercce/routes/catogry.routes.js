const Catogry = require("../controllers/catogry.controller")
const router = require("express").Router()
const  {adminAuth} = require("../middleware/auth.middleware")


router.post("/add",adminAuth ,Catogry.addcatogry)

router.delete("/delete/:id",adminAuth ,Catogry.deleteCatogry)

router.get("/all" ,Catogry.getAllCatogries)

router.get("/single/:id",Catogry.getSingleCatogry)

router.put("/update/:id",adminAuth ,Catogry.updateCatogry)


module.exports = router
