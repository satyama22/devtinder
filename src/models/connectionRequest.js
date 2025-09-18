const mongoose = require("mongoose");
const { __esModule } = require("validator/lib/isAlpha");
const ConnectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" ,//reference to User table like joins in Sql  it should given in string
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

//you can create indexed by putting index true in schema fromUserid field itself and this one is compound indexing
ConnectionRequestSchema.index({fromUserId:1},{toUserId:1});

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