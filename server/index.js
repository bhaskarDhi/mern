const dotenv=require('dotenv')
const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());
dotenv.config({path:'./config.env'});
require('./db/conn');
const User=require('./model/UserSchema');
app.use(require('./router/auth'));
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`lisenting ${PORT}`)
})