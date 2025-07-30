const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minlength:7,
        maxlength:15,
        trim:true,
    },
    lastName:{
        type:String,
        minlength:7,
        maxlength:15,
        trim:true,
    },
    age:{
        type:Number,
        min:18,
        max:60,
    },
    gender:{
        type:String,
        validate:function(value){
            if(!["male","female","other"].includes(value)){
                throw new error("invalid gender"+err.message);
            }
        }
    },
    emailId:{
        type:String,
        required: true,
        unique:true,
        trim:true,
        lowercase:true,

    },
    password:{
        type:String,
        minlength:7,
        maxlength:15,
    },
    skills:{
        type:[String],
        default:[],
    },
    about:{
        type:String,
        default:"this about is given by default by devTinder",
        minlength:20,
        maxlength:60,
    },
    photoUrl:{
        type:String,
    }
    },
    {
        timestamps:true,
    }
);

const User = new mongoose.model("User",userSchema);
module.exports=User;