const Contact = require("../controllers/conatct.controller")
const router = require("express").Router()
const  {adminAuth}= require("../middleware/auth.middleware")

router.post("/add",Contact.addcontact)
router.delete("/delete", Contact.deletecontact)
router.get("/show",adminAuth,Contact.getAllcontacts)

module.exports = router
