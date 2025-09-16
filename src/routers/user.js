const express=require("express");
const userRouter=express.Router();

const userAuth=require("../middlewares/auth.js");

userRouter.get("/user/request/pending",userAuth,
    async (req,res)=>{

        try{
            

        }catch(err){
            throw new Error("ERROR"+err.message);
        }
    }
);

module.exports=UserRouter;