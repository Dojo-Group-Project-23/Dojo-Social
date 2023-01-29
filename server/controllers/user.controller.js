const User =  require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = process.env.AUTH_KEY

module.exports = {
    register: (req,res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({id:user._id,email:user.email}, key)
                res.status(201).cookie('userToken',userToken,{httpOnly:true,expires:new Date(Date.now() + 9000000)}).json({msg:"success", user:user})
            })
            .catch(err => res.status(400).json(err))
    },
    login: async (req,res) => {
        const user = await User.findOne({email:req.body.email})
        if (!user) return res.status(400).json({error:'Invalid password/email'})
        try {
            const isValid = await bcrypt.compare(req.body.password, user.password)
            if (!isValid) return res.status(400).json({error:'Invalid password/email'})
            const userToken = jwt.sign({id:user._id,email:user.email}, key)
            res.status(201).cookie("userToken",userToken,{httpOnly:true,expires:new Date(Date.now() + 9000000)}).json({msg:"success", user:user})
        } catch (err) {
            console.log(err);
            res.status(400).json({error:'Invalid password/email'})
        }
    },
    logout: (req,res) => {
        res.clearCookie("userToken")
        res.json({msg:"Logged out"})
    },
    fecthAllUsers: (req,res) => {
        User.find()
            .then(allUsers => res.json(allUsers))
            .catch(err => res.json(err))
    },
    fecthUserById: (req,res) => {
        User.findById({_id:req.params.id})
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },
    updateUser: (req,res) => {
        User.updateOne({_id:req.params.id}, req.body, {runValidators:true})
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err))
    },
    deleteUser: (req,res) => {
        User.findByIdAndDelete({_id:req.params.id})
            .then(results => res.json(results))
            .catch(err => res.json(err))
    }
}