const jwt = require("jsonwebtoken");
const User= require("../models/user.js");
const bcrypt = require("bcrypt");

const userAuth =async (req,res,next)=>{
    try{
        const {token}=req.cookies;
     if(!token){
        throw new Error(" invalid token!!");
     }
     const decodeObj= jwt.verify(token,"Devtinder@123");
    
     const {_id}=decodeObj;
     const user= await User.findById(_id);
        if(!user){
            throw new Error("user does not exist");
        }
     req.user=user;
     next();
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
     
}

module.exports={
    userAuth
};