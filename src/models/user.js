const mongoose =require("mongoose");

const userSchema = mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    password:{
        type:String
    }

    }
);

const User = new mongoose.model("User",userSchema);
module.exports=User;