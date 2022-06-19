const mongoose = require("mongoose")
const bcryptjs=require("bcryptjs")
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true
    }, 
    content:{
        type:String,
    }, 
    image:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required: true,
        trim:true,
        match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    }
},
{
    timestamps:true
})
postSchema.methods.toJSON=function (){
    const post =this.toObject()
    delete post.__v
    return post
}
postSchema.pre("save", async function(){
    const user = this
    if(user.isModified("password"))
        user.password = await bcryptjs.hash(user.password, 12)
})
const Post = mongoose.model("Post",postSchema)

// const Post = mongoose.model("Post",
module.exports=Post
