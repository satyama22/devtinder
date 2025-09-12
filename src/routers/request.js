const express =require("express");
const requestRouter=express.Router();

const User= require("../models/user.js");
const {userAuth}=require("../middlewares/auth.js");
const ConnectionRequest=require("../models/ConncetionRequestModel");

requestRouter.post("/request/send/:status/:toUserId",
    userAuth,
    async(req,res)=>{
        try{
            const fromUserId=req.body.UserId
            const toUserId=req.params.toUserId
            const status=req.body.status

            const allowedStatus=["likes","pass"]
            if(!allowedStatus.includes(status)){
                //throw new Error("status is invalid")
                return res.status(400).json({
                     message:status+"status is invalid "
                    });
            }
            //check is toUserId present in Database
            const toUser=await User.findOne({userId:toUserId});
            if(!toUser){
                return res.status(400).json({
                    message:"user not found",
                });
            }

            //if any existing connectionRequest
            const existingConnectionRequest=await ConnectionRequest.findOne({
                $or: [
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
              ],
            });

            if(existingConnectionRequest){
                return res.status(400).json({
                    message:"connectionRequest already existed"
                });
            }


            const connectionRequest=new ConnectionRequest({
                fromUserId,
                toUserId,
                status
            });

            const data=await connectionRequest.save();
            res.json({
                message:re.user.firstName+"is"+status+"in"+toUser.firstName,
                data,
            })

        }catch(err){
            res.status(404).send("ERROR"+err.message);

        }



    }
);

module.exports=requestRouter;