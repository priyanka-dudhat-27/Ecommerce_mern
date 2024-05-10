const express=require('express')
const routs=express.Router()
const authController=require('../controllers/authController')
const jwt=require('jsonwebtoken')
const { requireLogin } = require('../middlewares/requireLogin')
const {isAdmin}=require('../middlewares/requireLogin')

routs.post('/register',authController.register)
routs.get('/login',authController.login)
routs.post('/createPost',requireLogin,isAdmin,authController.createPost)

module.exports=routs;