const fs = require("fs")
const readDataFromJSON = (fileName) => {
    let data 
    try{
        data = JSON.parse(fs.readFileSync(fileName))
        if(!Array.isArray(data)) throw new Error("data not valid")
    }
    catch(e){
        data = []
    }
    return data
}
const writeDataToJSON = (fileName, data) =>{
    try{
        if(!Array.isArray(data)) throw new Error("")
        fs.writeFileSync(fileName, JSON.stringify(data))
    }
    catch(e){
    }
}
module.exports = { readDataFromJSON, writeDataToJSON }