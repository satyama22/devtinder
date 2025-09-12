const express = require("express");
const profileRouter=express.Router();


const {userAuth}=require("../middlewares/auth.js");
/*const { validateEditData } = require("../utils/validate.js");
console.log("validateEditData is", validateEditData);*/
const {validateEditData }= require("../utils/validate.js");
const bcrypt = require("bcrypt");


profileRouter.get("/view",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
      }catch(err){
        res.status(404).send("something went wrong"+err.message);
    }
});


profileRouter.patch("/edit",userAuth,async(req,res)=>{
  
   try{

    if(!validateEditData(req.body)){
    throw new Error("invalid edit request");
    }


    const loggedInUser=req.user; 

    Object.keys(req.body).forEach((key)=> (loggedInUser[key]=req.body[key]));
    await loggedInUser.save();

    res.json({
        message:`${loggedInUser.firstName}, your profile is updated successfully`,
        data:loggedInUser,
    });
    
   }catch(err){
    res.status(404).send("something went wrong"+err.message);
 }
});

profileRouter.patch("/password",userAuth,async(req,res)=>{
    try{
        console.log("req.body is",req.body);
        const{oldPassword , newPassword}= req.body;

        if(!oldPassword || !newPassword){
            throw new Error("oldPassword and newPassword required to change password");
        } 

        const user = req.user;

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        await user.save();

        res.send("password changed succesfully")

    }catch(err){
        res.status(404).send("something went wrong"+err.message);
     }
});


module.exports= profileRouter;
    