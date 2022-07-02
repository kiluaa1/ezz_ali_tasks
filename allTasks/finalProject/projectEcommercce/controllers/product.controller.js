const productModel = require("../database/models/product.model")
const catogryModel = require("../database/models/catogry.model")
const fs = require("fs")
const path=require("path")
class Product{
    static addProduct= async(req,res)=>{
        try{
            const product = new productModel(req.body)
            const catogry = await catogryModel.findById(req.body.catogry)
            
                await product.save()
                res.status(200).send({
                    apiStatus: true,
                    data:product,
                    message:"product created"
                })
            
            // else(
            //     res.status(404).send({message:"not valid product"})
            // )
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in adding new product"
            })
        }
    }
    // show all product
    static getAllProducts = async(req, res) => {
        try{
            let quer={}
            if(req.query.catogry){
                quer = {catogryId:req.query.catogry}
            } 
            console.log(quer)
            const allProducts = await productModel.find(quer).populate("catogryId")
            if (allProducts){
                res.status(200).send({
                    apiStatus:true,
                    data:allProducts,
                    message:"data fetched"
                })       
            }
            else{
                res.status(404).send({message:"there is no products to fitch"})
            }
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    //get single product
    static getSingleProduct = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id)
            if (!product) {
                res.status(404).send({
                    apiStatus: false,
                    data: null,
                    message: "Not found"
                })
            }
            res.status(200).send({
                apiStatus: true,
                data: product,
                message: "data fetched"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }
    // function to delete product
    static deleteProduct= async(req,res)=>{
        try{
            const productData = await productModel.findByIdAndDelete(req.params.id)
            if(productData){
                res.status(200).send({
                    apiStatus:true,
                    data:productData,
                    message:"producct deleted succssesfuly"
                })
            }
            else{
                res.status(404).send({message:"threre is no product by this id"})
            }
            
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    // for update product
    static updateproduct= async(req,res)=>{
        try{
            const id = req.params.id
            if(id){
                const productData = await productModel.findByIdAndUpdate(
                    id,
                    req.body,
                    {runValidators:true}
                    )
                res.status(200).send({
                    apiStatus:true,
                    data:productData,
                    message:"product updated"
                })
            }
            else {
                res.status(404).send({
                    message:"can not update for product doesn't exist"
                })
            }
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    static categoryProducts = async (req, res) => {
        try {
            const products =await productModel.findOne({catogryId:req.params.catogryId})
           
            res.status(200).send({ data: products })
        } catch (e) {
            res.status(500).send({
                error: e.message
            })
        }
    }
    static uploadImage=  async(req, res)=>{
        try{
            const ext = path.extname(req.file.originalname)
            const newName = "images/"+req.file.fieldname + Date.now()+ext
            fs.rename(req.file.path, newName, ()=>{})
            const product = await productModel.findOne({_id:req.params.id})
            product.image = newName
            await product.save()
            res.send({data:product})
        }
        catch(e){
            res.send(e.message)
        }
    }
}

module.exports=Product