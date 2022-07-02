const catogryModel = require("../database/models/catogry.model")
class Catogry{
    // functon to add new catogry
    static addcatogry = async(req,res)=>{
        try{
            const catogry = new catogryModel(req.body)
            await catogry.save()
            res.status(200).send({
                apiStatus: true,
                data:catogry,
                message:"catogry created"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in adding new catogry"
            })
        } 
    }
    // function to delete catogry
    static deleteCatogry= async(req,res)=>{
        try{
            const categoryData = await catgoryModel.findByIdAndDelete(req.params.id)
            if(categoryData){
                res.status(200).send({
                    apiStatus:true,
                    data:categoryData,
                    message:"catogry deleted succssesfuly"
                })
            }
            else{
                res.status(404).send({message:"threre is no catogry by this id"})
            }
            
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    // for update catogry
    static updateCatogry= async(req,res)=>{
        try{
            const id = req.params.id
            if(id){
                const catogryData = await catogryModel.findByIdAndUpdate(
                    id,
                    req.body,
                    {runValidators:true}
                    )
                res.status(200).send({
                    apiStatus:true,
                    data:catogryData,
                    message:"catogry updated"
                })
            }
            else {
                res.status(404).send({
                    message:"can not update for catogr doesn't exist"
                })
            }
            
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    // get all catogries 
    static getAllCatogries = async(req, res) => {
        try{
            const allCatogries = await catogryModel.find()
            if (allCatogries){
                res.status(200).send({
                    apiStatus:true,
                    data:allCatogries,
                    message:"data fetched"
                })       
            }
            else{
                res.status(404).send({message:"there is no catogries to fitch"})
            }
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    //get single catogry 
    static getSingleCatogry = async(req, res) => {
        try{
            const id = req.params.id
            if (id){    
                const catogry = await catogryModel.findById(id)
                res.status(200).send({
                    apiStatus:true,
                    data:catogry,
                    message:"data fetched"
                })
            }
            res.status(404).send({message :"not found"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    
}
module.exports = Catogry
