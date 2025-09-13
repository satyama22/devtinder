const mongoose = require("mongoose");
const { __esModule } = require("validator/lib/isAlpha");
const ConnectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["likes","pass","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,

        },
        required:true,
    }
    },
    {
        timestamps:true,
    }
);

ConnectionRequestSchema.pre("save",function(next){
    //checking if fromUserId and toUserId are same 
    const connectionRequest=this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return next(new Error("cannot send connectionRequest to Yourself"));
    }
    next();
});

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",ConnectionRequestSchema);
module.exports=ConnectionRequestModel;