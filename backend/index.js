const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const port=process.env.PORT || 3000

// mongodb connection
const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((res)=>{
    console.log('connect to mongodb')
})
.catch((err)=>console.log(err))

app.use(express.urlencoded())
app.use(express.json())

app.use('/',require('./routes/index'))
 app.listen(port,async(err)=>{
    (err)?console.log(err):console.log(`server is running at port ${port}`)
 })
