const mongoose =require("mongoose")
const itemSchema= mongoose.Schema({
    quantity:{
        type:Number,
        require:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    }
    
})
const Item = mongoose.model("Item",itemSchema)
module.exports=Item