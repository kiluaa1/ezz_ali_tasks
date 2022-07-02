const userModel = require("../database/models/user.model")
const { sendEmailMe, sendForgetPass } = require("../helper/sendVerficationMail")
class User {
    // function of user 
    //add user and send random otp to his mail (to checn in the mail )
    static register = async (req, res) => {
        try {
            const user = new userModel(req.body)
            user.userType = "user"
            await user.save()
            let otp = +(Math.floor(Math.random() * 10000))
            sendEmailMe(user.email, otp)
            user.otp = otp
            await user.save()
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "pending please verify your mail"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in register"
            })
        }
    }
    // to login 
    static login = async (req, res) => {
        try {
            const user = await userModel.loginUser(req.body.email, req.body.password)
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus: true,
                data: { user, token },
                message: "logged in"
            })
            return;
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }
    // to verify the account 
    static verify = async (req, res) => {
        try {
            const userOTP = req.body.otp
            if (req.user.otp == userOTP) {
                req.user.verify = true
                req.user.cash = 100
                req.user.otp = ""
                await req.user.save()
                sendEmailMe(req.user.email, "here is a 100 pound award for verify your mail")

                res.status(200).send({ message: "here is a 100 pound award for verify your mail" })
            }
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }
    // get all users 
    static getAllUsers = async (req, res) => {
        try {
            if (req.user.verify == true) {
                const allUsers = await userModel.find()
                res.status(200).send({
                    apiStatus: true,
                    data: allUsers,
                    message: "data fetched"
                })
            }
            res.status(404).send({ message: "please verify your account first " })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
        return
    }
    //get single user 
    static getAllUsers = async (req, res) => {
        try {
            if (req.user.verify == true) {
                const allUsers = await userModel.find()
                res.status(200).send({
                    apiStatus: true,
                    data: allUsers,
                    message: "data fetched"
                })
                return;
            }
            res.status(404).send({ message: "please verify your account first " })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    
    }
    //get single user 
    static getSingleUser = async (req, res) => {
        try {
            if (req.user.verify == true) {
                const allUsers = await userModel.findById(req.user.id)
                res.status(200).send({
                    apiStatus: true,
                    data: allUsers,
                    message: "data fetched"
                })
                return;
            }
            res.status(404).send({ message: "please verify your account first " })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
      
    }
    //update password
    static changePassword = async (req, res) => {
        try {
            const userData = req.user
            userData.password = req.body.password
            await userData.save()
            res.status(200).send({
                apiStatus: true,
                data: userData,
                message: "data fetched"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }
    //update user
    static updateUser = async (req, res) => {
        try {
            const userData = await userModel.findByIdAndUpdate(
                req.user._id,
                req.body,
                { runValidators: true }
            )
            res.status(200).send({
                apiStatus: true,
                data: userData,
                message: "data fetched"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }
    //remove account
    static deleteUser = async (req, res) => {
        try {
            const userData = await userModel.findByIdAndDelete(req.user._id)
            res.status(200).send({
                apiStatus: true,
                data: userData,
                message: "data fetched"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }
    static logout = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token)
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: "logged out"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }
    static logoutAll = async (req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: "logged out"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }
    static profile = async (req, res) => {
        res.status(200).send({ apiStatus: true, data: req.user, message: "data featched" })
    }
    static addAddr = async (req, res) => {
        try {
            req.user.addresses.push(req.body)
            await req.user.save()
            res.status(200).send({ data: req.user, apiStatus: true, message: "ADDED" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, message: e.message })
        }
    }
    // forget password 
    static forgetPassword = async (req, res) => {
        try {
            const user = await userModel.findOne(req.body)
            if (user) {
                const d = this.randomNumber()
                user.reset = d
                await user.save()
                sendForgetPass(user.email, d)
                res.status(200).send({
                    apiStatus: true,
                    message: "open your mail",
                    data: user

                })
                return; ///ask 
            }
            res.status(404).send({ message: "email not valid" })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in forget password"
            })

        }
    }
    static resetPassword = async (req, res) => {
        try {
            const data = req.body.email
            const user = await userModel.findOne({ email: data })
            if (user.reset == req.body.verify) {
                user.password = req.body.password
                await user.save()
                // const userdata = await userModel.findOneAndUpdate(
                //     {email: req.body.email},
                //    await {password : req.body.password},
                //     {runValidators:true}
                //     )
                if (user) {
                    res.status(200).send({
                        apiStatus: true,
                        message: "password change ",
                        data: user
                    })
                }
                return; ///ask 
            }
            res.status(404).send({ message: "credintialws not valid" })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in reset password"
            })
        }
    }
    static uploadFileImage = async (req, res, next) => {
        try {
            const oldFile = req.user.image
            req.user.image = req.file.path
            await req.user.save()
            fs.unlink(oldFile, () => { })
            res.status(200).send(req.user)
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
    // function to generate otp 
    static randomNumber = () => {
        let x = +(Math.floor(Math.random() * 10000))
        return x
    }

}
module.exports = User