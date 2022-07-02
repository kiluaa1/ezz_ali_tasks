const Product = require("../controllers/product.controller")
const router = require("express").Router()
const {adminAuth}  = require("../middleware/auth.middleware")
const multer  = require('multer')
const upload = multer({ dest: 'images/' })

router.post("/add",adminAuth,Product.addProduct)

router.get("/all" ,Product.getAllProducts)

router.get("/single/:id",Product.getSingleProduct)

router.delete("/delete/:id",adminAuth ,Product.deleteProduct)

router.put("/update",adminAuth,Product.updateproduct)
router.get("/CategoryProducts/:id",Product.categoryProducts)
router.patch('/productimage/:id',adminAuth, upload.single('product'), Product.uploadImage)


module.exports=router
