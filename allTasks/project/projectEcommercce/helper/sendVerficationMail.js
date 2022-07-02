const nodemailer = require("nodemailer")
const smtpConfig = {
    service:"gmail",
    auth:{
        user:"karimbenzo914@gmail.com",
        pass:"fjlzbepuwgafdibk"
    }
}
const sendEmailMe = async (reciver,textEmail)=>{
    try{
        const transporter =nodemailer.createTransport(smtpConfig)
        await transporter.sendMail({
            from:"best player in the world ",
            to:reciver,
            subject:"plese verify your accout ",
            html:`<h1>verify your mail </h1> <p>here is verifucation code ${textEmail}</p>`
        })
    }
    catch(e){
        console.log(e)  
    }
}
const sendForgetPass = async (reciver,textEmail)=>{
    try{
        const transporter =nodemailer.createTransport(smtpConfig)
        await transporter.sendMail({
            from:"best player in the world will help you to reset ypur password ",
            to:reciver,
            subject:"reset your password ",
            html:`<h1>complete instruction to reset password </h1> <p>here is reset code ${textEmail}</p>`
        })
    }
    catch(e){
        console.log(e)  
    }
}
module.exports = {sendEmailMe,sendForgetPass}
