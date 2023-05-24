const express=require('express');
const router= express.Router();
require('./../db/conn');
const User=require('./../model/UserSchema');
router.get('/home',(req,res)=>{
    res.send('hiii')
})
router.post('/register',(req,res)=>{
      const {name,email,phone,work,password,cpassword}=req.body;
      if(!name  || !email  || !phone  || !work  || !password  || !cpassword){
         res.status(422).json({"err":"érr"})
      }else{
        User.findOne({email}).then((res)=>{
          
           if(!res){
            const user=new User({name,email,phone,work,password,cpassword})
            user.save().then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
           }
        })
      }
})
module.exports=router;