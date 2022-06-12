const yargs=require("yargs")

const http =require("http")
const { string } = require("yargs")
let x 


yargs.command({
    command:"fetchApi"
    ,builder:{
        url:{
            type:string,
            demandOption:true
        }
    }
    ,handler :function(argv){
        x=argv.url
    }
})
yargs.argv

const req = http.request(x,(res)=>{
    let allData=""
    res.on("data",(myData)=>{
        allData += myData.toString()
    })
    res.on("end",()=>{
        console.log(JSON.parse(allData))
    })
})
req.on("error",(err)=>console.log(`error => ${err}`))
req.end()
