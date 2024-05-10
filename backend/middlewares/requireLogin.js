const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=require('../models/userModel')

module.exports.requireLogin=async(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(404).json({message:'You have to Login first !'})
    }
    const token=authorization.replace("Bearer ",'')
    // console.log(token)
    jwt.verify(token,process.env.JWT_SECRET,async(err,payLoad)=>{
        if(err){
            return res.status(404).json({message:'Invalid or Expired token,You have to Login first'})
        }else{
            try {
                const {_id}=payLoad;
                let userData=await User.findById(_id)
                if(userData){
                    // console.log(userData)
                    req.user=userData
                    console.log(req.user)
                    next()
                }
            } catch (error) {
                console.log(error)
                return res.status(404).json({message:'Something Wrong !',status:0})
            }
        }
    })
}

// admin access
module.exports.isAdmin = async (req, res, next) => {
    try {
        const userData = await User.findById(req.user._id);
        if(userData.role !== 'admin'){
            return res.status(403).json({ message: 'You are not an admin. Unauthorized access.' });
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong.', status: 0 });
    }
}
