const dbConnect=(cb)=>{
    const {MongoClient} = require("mongodb")
    const dbUrl="mongodb://localhost:27017"
    const dbName="users"
    MongoClient.connect(dbUrl,{},(err,client)=>{
        if(err) return console.log("errore happen in connection to database")
        const db =client.db(dbName)
        cb(db, client)
    })
}
module.exports=dbConnect
