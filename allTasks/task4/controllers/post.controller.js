const deal = require("./dealWithJson.controller")

class Post{
    static home = (req, res)=>{ 
        const data =deal.readDataFromJSON("models/posts.json")
        res.render("home",{
            pageTitle:"all data"
            ,data,
            isEmpty: !data.length   })
    }
    static add = (req, res)=>{ 
        if(req.query.title){
            const post ={...req.query,id:Date.now()}
            const data =deal.readDataFromJSON("models/posts.json")
            data.push(post)
            deal.writeDataToJSON("models/posts.json",data)
            res.redirect("/")
        }
        else{
            res.render("add",{pageTitle:"add data"})
        }
        
    }
    static addPost = (req, res)=>{ 
        res.render("addPost",{pageTitle:"add data"})
    }
    static addPostLogic = (req, res)=>{ 
        const post ={...req.body,id:Date.now()}
            const data =deal.readDataFromJSON("models/posts.json")
            data.push(post)
            deal.writeDataToJSON("models/posts.json",data)
            res.redirect("/")
    }
    static single =  (req, res)=>{ 
        const data = deal.readDataFromJSON("models/posts.json")
        const id = req.params.id
        const allData = data.find(p=> p.id == id)
        res.render("single",{pageTitle:"single data",allData})
    }
    static edit =  (req, res)=>{ 
        
        const data = deal.readDataFromJSON("models/posts.json")
        const id = req.params.id
        const allData = data.find(p=> p.id == id)
        res.render("editPost",{pageTitle:"edit data",allData})
    }
    static editLogic =  (req, res)=>{ 
    
        const data =deal.readDataFromJSON("models/posts.json")
        const id =req.params.id
        const post ={...req.body,id}
        let index = data.findIndex(p=> p.id == id)
        data[index]=post
        deal.writeDataToJSON("models/posts.json",data)
        res.redirect("/")
            

    }
    static delete = (req, res)=>{ 
        const data =deal.readDataFromJSON("models/posts.json")
        const id = req.params.id
        const filteredUsers = data.filter(user=> user.id != id)
        deal.writeDataToJSON("models/posts.json", filteredUsers)
        res.redirect("/")


    }

 
}

module.exports = Post 
