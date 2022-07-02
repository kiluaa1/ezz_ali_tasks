const mongoose =require("mongoose")
const catogrySchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        // required:true
    }
})
catogrySchema.virtual("CategoryProducts",{
    ref:"Product",
    localField:"_id",
    foreignField:"catogryId"
})

const Catogry = mongoose.model("Catogry",catogrySchema)
module.exports=Catogry