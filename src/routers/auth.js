const express =require("express");
const authRouter=express.Router();

const {validateUserData} = require("../utils/validate.js");
const User= require("../models/user.js");
const bcrypt = require("bcrypt");


authRouter.post("/auth/signup",async (req,res)=>{
    try{
     //validate the user
       validateUserData(req);

       const { firstName,lastName,password,emailId }=req.body;
     //encryption of password
             const passwordHash= await bcrypt.hash(password,10)
    //creating a user instance

    const user = new User({firstName,lastName,password:passwordHash,emailId});
    
 
    await user.save();
    res.send("data added successfully");
   }catch(err){
    res.status(400).send("ERROR: "+err.message);
   }

})

authRouter.post("/login",async(req,res)=>{
    try{
          const {emailId,password}=req.body;
          const user=await User.findOne( {emailId : emailId});
          if(!user){
             throw new Error("invalid credentials");
          }
          const isPasswordValid = await user.validatePassword(password);
  
          if(isPasswordValid){
             //getting jwt token from userschema.methods of user.js
              const token = await user.getJWT();
              
              res.cookie("token",token,{ maxAge: 86400000 });
              res.send("login was successful");
          }else{
              throw new Error("invalid credentials");
          }
      }catch(err){
      res.status(404).send("ERROR: "+err.message);
     }
  })

authRouter.post("/logout",async(req,res)=>{
     res.cookie("token",null,{
        expires: new Date(Date.now()),
     });
     res.send("logged out successfully");
})


module.exports = authRouter;