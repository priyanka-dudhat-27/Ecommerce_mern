const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const moment=require('moment')
const jwt=require('jsonwebtoken')
module.exports.register=async(req,res)=>{
    try {
        const {name,email,password,phone,adress}=req.body;
        // validation
        if(!name || !email || !password || !phone || !adress){
            return res.status(404).json({message:'please fill all required fields'})
        }

        // existing user
        const checkEmail=await User.findOne({email: email})
        if(checkEmail){
            return res.status(200).json({message:'user already exists',status:1})
        }else{
            req.body.created_date=moment().format('LLL')
            req.body.password=await bcrypt.hash(password,10)
            const userData=await User.create(req.body)
            if(userData){
                return res.status(200).json({message:'user created successfully',status:1,data:userData})
            }else{
                return res.status(404).json({message:'user not found',status:0})
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:'Something Wrong !',status:0})
    }
}

module.exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(200).json({message:'please add email and password'})
        }

        let checkEmail=await User.findOne({email:email})
        if(checkEmail){
           let checkPassword=await bcrypt.compare(password,checkEmail.password)
           if(checkPassword){
            var token=jwt.sign({_id:checkEmail.id},process.env.JWT_SECRET,{expiresIn:'1h'})
            const {_id,name,email,phone,adress}=checkEmail
                return res.status(200).json({message:'Login Successfully',status:1,data:checkEmail,token:token})
           }else{
            return res.status(404).json({message:'Password not Match',status:0})
           }
        }else{
            return res.status(404).json({message:'user not found'})
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:'Something Wrong !',status:0})
    }
}

module.exports.createPost=async(req,res)=>{
    console.log('hello auth')
}