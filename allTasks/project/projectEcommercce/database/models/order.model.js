const mongoose =require("mongoose")
const orderSchema= mongoose.Schema({
    itemId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
        required:true
    }],
    status:{
        type:String,
        required:true,
        default:"pending"
    },
    totalPrice:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{
    timestamps:true
})
const Order = mongoose.model("Order",orderSchema)
module.exports=Order