const mongoose =require("mongoose")
const productSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        default:""
    },
    price:{
        type:Number,
        required:true
    },
    catogryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catogry",
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0
    },
    comment:{
        type:String
    }
})
const Product = mongoose.model("Product",productSchema)
module.exports=Product