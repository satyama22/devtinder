const express=require("express");
const userRouter=express.Router();

const {userAuth}=require("../middlewares/auth.js");
const ConnectionRequest=require("../models/connectionRequest.js")

const USER_SAFE_DATA="firstName lastName age gender about skills photoUrl";

userRouter.get("/user/request/pending",userAuth, async (req,res)=>{

        try{
            const loggedInUser=req.user;
            
            const connectionRequests=await ConnectionRequest.find({
                toUserId:loggedInUser._id,
                status:"likes"
            }).populate("fromUserId",USER_SAFE_DATA);

            res.json({
                message:"connection requests fetched successfully",
                data:connectionRequests
            });

        }catch(err){
            throw new Error("ERROR"+err.message);
        }
    }
);





module.exports=userRouter;