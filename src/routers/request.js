const express =require("express");
const requestRouter=express.Router();

const User= require("../models/user.js");
const {userAuth}=require("../middlewares/auth.js");
requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{

    const user=req.user;
    console.log("sending connection request ");
    res.send("connection request sent by "+user.firstName);
})

module.exports=requestRouter;