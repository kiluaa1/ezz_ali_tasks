const contactModel = require("../database/models/contacat.model")
class Contact{
    // functon to add new contact
    static addcontact = async(req,res)=>{
        try{
            const contact = new contactModel(req.body)
            await contact.save()
            res.status(200).send({
                apiStatus: true,
                data:contact,
                message:"contact created"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in adding new contact"
            })
        } 
    }
    // function to delete contact
    static deletecontact= async(req,res)=>{
        try{
            const contactData = await contactModel.findByIdAndDelete(req.params.id)
            if(contactData){
                res.status(200).send({
                    apiStatus:true,
                    data:conatactData,
                    message:"contact deleted succssesfuly"
                })
            }
            else{
                res.status(404).send({message:"threre is no contact by this id"})
            }
            
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    // get all contacts 
    static getAllcontacts = async(req, res) => {
        try{
            const allContact = await contactModel.find()
            if (allcontactes){
                res.status(200).send({
                    apiStatus:true,
                    data:allcontacts,
                    message:"data fetched"
                })       
            }
            else{
                res.status(404).send({message:"there is no contact to fitch"})
            }
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
}
module.exports=Contact