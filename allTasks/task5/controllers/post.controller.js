const dbConnect =require("../db/connet")
const {ObjectId} = require("mongodb")
class post {
    static home = (req,res)=>{  
        dbConnect(db=> 
                db.collection("users")
                .find()
                .toArray((error,data)=>{
                    res.render("home", {
                        pageTitle:"all posts",
                        data,
                        isEmpty: !data.length
                    })
        })
        )}
    static addUser =(req,res)=>{
        res.render("addUser",{
            pageTitle:"Add user"
        })

    }
    static addUserLogic =(req,res)=>{
        dbConnect((db)=>{
            const post ={...req.body}
            db.collection("users").insertOne(post)
            .then(()=>res.redirect("/"))
            .catch(e=>console.log(e))
        })
    }
    static single =(req,res)=>{
        dbConnect(db=>{
            const id = req.params.id
            db.collection("users").findOne({_id:new ObjectId(id)})
            .then(userData=>{
                res.render("single",{
                    pageTitle:"single Post", userData
                })
            })
        })
    }
    static edit=(req,res)=>{
        const postId = req.params.id
        dbConnect(db=>{
            db.collection("users")
            .findOne({_id:new ObjectId(postId)})
            .then(
                userData=>
                    res.render("edit", {
                        pageTitle:"Edit user", userData
                    })
                )
            })
    }
    static editLogic = (req,res)=>{
        dbConnect(db=>{
            db.collection("users")
            .updateOne(
                {_id:new ObjectId(req.params.id)},
                { $set:req.body }
            )
            .then(r=>res.redirect("/"))
        }  )
    }
    static delItem = (req,res)=>{
        const postId = req.params.id
        dbConnect(db=>
        db.collection("users")
        .deleteOne({_id:new ObjectId(postId)})
            .then(r=> res.redirect("/"))
        )
    }
    static status =(req ,res )=>{ 
        dbConnect(db=>
            db.collection("users")
            .updateOne({_id: new ObjectId(req.params.id)},
            {$set:
                {                    
                    status: req.params.status=="unactive"? "active" : "unactive"
                }
            }
            )            
            .then(r=>{res.redirect("/")})    
        )
    }
}
module.exports = post