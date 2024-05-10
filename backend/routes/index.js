const express=require('express')
const routs=express.Router()

routs.use('/auth',require('./auth'))

module.exports=routs;