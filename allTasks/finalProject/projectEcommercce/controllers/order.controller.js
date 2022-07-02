const orderModel = require("../database/models/order.model")
class Order{
    // functon to add new order
    static addOrder = async(req,res)=>{
        try{
            const order = new orderModel(req.body)
            order.userId = req.user._id
            await order.save()
            res.status(200).send({
                apiStatus: true,
                data:order,
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
    // get all orders 
    static getAllOrders = async(req, res) => {
        try{
            const allOrders = await orderModel.find()
            
            .populate(
                {path:"itemId",populate : 
                {path:"productId",populate:"catogryId"}})
            .populate("userId")
            if (allOrders){
                res.status(200).send({
                    apiStatus:true,
                    data:allOrders,
                    message:"data fetched"
                })       
            }
            else{
                res.status(404).send({message:"there is no orders to fitch"})
            }
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    static updateStatus = async (req,res)=>{
        try{
            const order = await orderModel.findByIdAndUpdate(
                        req.params.id,
                        {
                            status:req.body
                        }
                    )
            if(!order) res.status(404).send("order id not found")
            await order.save()
            res.status(200).send({
                apiStatus:true,
                data:order,
                message:"data updated"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
        
    }
    // cancel the order in admin pannel 
    static deleteorder= async(req,res)=>{
        try{
            const orderData = await orderModel.findByIdAndDelete(req.params.id)
            if(orderData){
                res.status(200).send({
                    apiStatus:true,
                    data:orderData,
                    message:"order deleted succssesfuly"
                })
            }
            else{
                res.status(404).send({message:"threre is no order by this id"})
            }
            
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    
    
}
module.exports=Order