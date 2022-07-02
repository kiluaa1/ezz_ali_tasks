const itemModel = require("../database/models/item.model")
class Item {
    // functon to add new order
    static addItem = async(req,res)=>{
        try{
            const item = new itemModel(req.body)
            await item.save()
            res.status(200).send({
                apiStatus: true,
                data:item,
                message:"order created"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in adding new order"
            })
        } 
    }
    // get all items 
    static getAllItems = async(req, res) => {
        try{
            const allItems = await itemModel.find()
            if (allItems){
                res.status(200).send({
                    apiStatus:true,
                    data:allItems,
                    message:"data fetched"
                })       
            }
            else{
                res.status(404).send({message:"there is no items to fitch"})
            }
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    // delete item
    static deleteitem= async(req,res)=>{
        try{
            const itemData = await itemModel.findByIdAndDelete(req.params.id)
            if(itemData){
                res.status(200).send({
                    apiStatus:true,
                    data:itemData,
                    message:"item deleted succssesfuly"
                })
            }
            else{
                res.status(404).send({message:"threre is no item by this id"})
            }
            
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    
}
module.exports=Item