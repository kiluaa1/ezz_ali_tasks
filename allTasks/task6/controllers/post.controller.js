const postModel = require("../database/models/post.model")
class Post{
    static add = async(req,res)=>{
        try{
            const post = new postModel(req.body)
            await post.save()
            res.status(200).send({
                apiStatus: true,
                data:post,
                message:"user added successfuly"
            })
        }
        catch(e){   
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in register"
            })
        }
    }
    static showAll = async(req,res)=>{
        try{
            const data = await postModel.find()
                res.status(200).send({
                apiStatus: true,
                data,
                message:"user added successfuly"
            })
        }
        catch(e){   
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in register"
            })
        }
    }
    static getSinglePost = async(req, res) => {
        try{
            const postData = await postModel.findById(req.params.id)
            res.status(200).send({
                apiStatus:true,
                data:postData,
                message:"data fetched"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    static updatepassword = async(req,res) =>{
        try{
            const postData = await postModel.findById(req.params.id)
            postData.password = req.body.password
            await postData.save()
            res.status(200).send({
                apiStatus:true,
                data:postData,
                message:"data fetched"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    static deletePost= async(req,res)=>{
        try{
            const postData = await postModel.findByIdAndDelete(req.param.id)
            res.status(200).send({
                apiStatus:true,
                message:"post deleted"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
}
module.exports = Post